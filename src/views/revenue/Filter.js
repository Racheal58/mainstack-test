import { Text, Flex } from "@chakra-ui/react";
import {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useMemo,
} from "react";
import MultiSelect from "../../components/select/MultiSelect";
import DateRanger from "../../components/date";
import CustomButton from "../../components/button";
import { filterTransactions, toSnakeCase } from "../../utils/helpers/functions";
import {
  TYPE_OPTIONS,
  STATUS_OPTIONS,
} from "../../utils/helpers/variableItems";

const Filter = forwardRef(
  ({ filterValue, setFilterTransactionsData, setIsFilterChanged }, ref) => {

    const [selectedTypes, setSelectedTypes] = useState(TYPE_OPTIONS);
    const [selectedStatus, setSelectedStatus] = useState(STATUS_OPTIONS);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const isFirstRender = useRef(true);

    const defaultDate = useMemo(() => new Date(), []);

    useEffect(() => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      const hasChanged =
        JSON.stringify(selectedTypes) !== JSON.stringify(TYPE_OPTIONS) ||
        JSON.stringify(selectedStatus) !== JSON.stringify(STATUS_OPTIONS) ||
        new Date(startDate).toDateString() !== defaultDate.toDateString() ||
        new Date(endDate).toDateString() !== defaultDate.toDateString();

      setIsFilterChanged?.(hasChanged);
    }, [
      selectedTypes,
      selectedStatus,
      startDate,
      endDate,
      setIsFilterChanged,
      defaultDate,
    ]);

    const resetForm = () => {
      setSelectedTypes(TYPE_OPTIONS);
      setSelectedStatus(STATUS_OPTIONS);
      setStartDate(new Date());
      setEndDate(new Date());
    };

    const toggleType = (type) => {
      setSelectedTypes((prev) =>
        prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
      );
    };

    const toggleStatus = (status) => {
      setSelectedStatus((prev) =>
        prev.includes(status)
          ? prev.filter((s) => s !== status)
          : [...prev, status]
      );
    };

    const applyFilter = () => {
      const filterData = {
        startDate,
        endDate,
        types: selectedTypes.map((type) => toSnakeCase(type)),
        status: selectedStatus.map((status) => toSnakeCase(status)),
      };
      const filtered = filterTransactions(filterValue, filterData);
      setFilterTransactionsData(filtered);
    };

    useImperativeHandle(ref, () => ({
      applyFilter,
      resetForm,
    }));

    return (
      <>
        <form onSubmit={applyFilter}>
          <Flex gap={{ base: 2, md: 3 }} mb={6} flexWrap="wrap">
            {["Today", "Last 7 days", "This month", "Last 3 months"].map(
              (label, index) => (
                <CustomButton
                  key={index}
                  label={label}
                  bg="#F5F5F5"
                  color="black"
                  fontSize={{ base: "12px", md: "15px" }}
                  fontWeight="500"
                  h={{ base: "36px", md: "44px" }}
                  flex="1"
                  minW={{ base: "calc(50% - 4px)", md: "auto" }}
                  borderRadius="full"
                  _hover={{ bg: "#E8E8E8" }}
                />
              )
            )}
          </Flex>

          <Text fontSize={{ base: "14px", md: "16px" }} fontWeight="600" mb={3}>
            Date Range
          </Text>
          <Flex
            gap={{ base: 2, md: 4 }}
            mb={6}
            direction={{ base: "column", sm: "row" }}
          >
            {[
              {
                label: "Start Date",
                value: startDate,
                setter: setStartDate,
              },
              {
                label: "End Date",
                value: endDate,
                setter: setEndDate,
              },
            ].map((obj, index) => (
              <DateRanger
                key={index}
                label={obj.label}
                value={obj.value}
                setter={obj.setter}
                refState={obj.refState}
                max={new Date().toISOString().split("T")[0]}
              />
            ))}
          </Flex>

          {[
            {
              title: "Transaction Type",
              options: TYPE_OPTIONS,
              setter: toggleType,
              value: selectedTypes,
            },
            {
              title: "Transaction Status",
              options: STATUS_OPTIONS,
              setter: toggleStatus,
              value: selectedStatus,
            },
          ].map((obj, index) => (
            <MultiSelect
              key={index}
              title={obj.title}
              options={obj.options}
              setter={obj.setter}
              value={obj.value}
            />
          ))}
        </form>
      </>
    );
  }
);

export default Filter;
