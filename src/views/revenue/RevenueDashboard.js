import { useEffect, useState, useRef } from "react";
import { Box, Flex, Text, useDisclosure, Heading } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { IoChevronDownOutline, IoReceiptOutline } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { BsDownload } from "react-icons/bs";
import CustomDrawer from "../../components/drawer";
import CustomButton from "../../components/button";
import Filter from "./Filter";
import { getAPIEndpoint } from "../../utils/api/endpoint";
import { CHART_DATA, CHART_OPTIONS } from "../../utils/helpers/charts";
import {
  formatCurrencyAmount,
  formatDate,
} from "../../utils/helpers/functions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export default function RevenueDashboard() {
  const filterRef = useRef(null);
  const [walletData, setWalletData] = useState(null);
  const [transactionsData, setTransactionsData] = useState(null);
  const [filterTransactionsData, setFilterTransactionsData] = useState(null);
  const [isFilterChanged, setIsFilterChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const walletResponse = await getAPIEndpoint("wallet");
      const transactionsResponse = await getAPIEndpoint("transactions");
      if (!walletResponse && transactionsResponse) {
        setLoading(false);
        return;
      }
      setWalletData(walletResponse);
      setTransactionsData(transactionsResponse);
      setLoading(false);
    };

    fetchData();
  }, []);

  const listToRender = isFilterChanged
    ? filterTransactionsData || []
    : transactionsData || [];

  const handleApply = () => {
    if (filterRef.current) {
      filterRef.current.applyFilter();
    }
    onClose();
  };

  const handleClear = () => {
    if (filterRef.current) {
      filterRef.current.resetForm();
    }
    onClose();
  };

  return (
    <Box bg="#FAFAFA" minH="100vh" p={{ base: 4, md: 8 }} width={"full"}>
      <Flex
        gap={{ base: 6, md: 8 }}
        maxW="1400px"
        mx="auto"
        direction={"column"}
      >
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 6, lg: 8 }}
        >
          <Box flex="1">
            <Flex
              align="center"
              mb={6}
              direction={{ base: "column", sm: "row" }}
              gap={{ base: 4, sm: 16 }}
            >
              <Box>
                <Text fontSize="13px" color="#999" mb={1}>
                  Available Balance
                </Text>
                <Text
                  fontSize={{ base: "28px", md: "42px" }}
                  fontWeight="700"
                  letterSpacing="-1px"
                >
                  USD{" "}
                  {walletData
                    ? formatCurrencyAmount(walletData.balance)
                    : "0.00"}
                </Text>
              </Box>
              <CustomButton
                label="Withdraw"
                bg="black"
                color="white"
                borderRadius="full"
                px={8}
                h="48px"
                fontSize="15px"
                fontWeight="500"
                _hover={{ bg: "#333" }}
                w={{ base: "full", sm: "auto" }}
              />
            </Flex>
            <Box
              bg="white"
              borderRadius="16px"
              p={{ base: 4, md: 6 }}
              h={{ base: "200px", md: "340px" }}
              mb={{ base: 6, lg: 0 }}
            >
              <Line data={CHART_DATA} options={CHART_OPTIONS} />
            </Box>
          </Box>

          <Box w={{ base: "full", lg: "280px" }}>
            <Flex
              direction={{ base: "row", lg: "column" }}
              gap={3}
              flexWrap={{ base: "wrap", lg: "nowrap" }}
            >
              {[
                {
                  title: "Ledger Balance",
                  icon: <AiOutlineExclamationCircle size={15} />,
                  amount: `USD ${
                    walletData
                      ? formatCurrencyAmount(walletData.ledger_balance)
                      : "0.00"
                  }`,
                },
                {
                  title: "Total Payout",
                  icon: <AiOutlineExclamationCircle size={15} />,
                  amount: `USD ${
                    walletData
                      ? formatCurrencyAmount(walletData.total_payout)
                      : "0.00"
                  }`,
                },
                {
                  title: "Total Revenue",
                  icon: <AiOutlineExclamationCircle size={15} />,
                  amount: `USD ${
                    walletData
                      ? formatCurrencyAmount(walletData.total_revenue)
                      : "0.00"
                  }`,
                },
                {
                  title: "Pending Payout",
                  icon: <AiOutlineExclamationCircle size={15} />,
                  amount: `USD ${
                    walletData
                      ? formatCurrencyAmount(walletData.pending_payout)
                      : "0.00"
                  }`,
                },
              ].map((obj, index) => (
                <Box
                  key={index}
                  bg="white"
                  borderRadius="16px"
                  p={5}
                  flex={{ base: "1 1 calc(50% - 6px)", lg: "none" }}
                  minW={{ base: "calc(50% - 6px)", lg: "auto" }}
                >
                  <Flex justify="space-between" align="center" mb={2}>
                    <Text fontSize="13px" color="#999">
                      {obj.title}
                    </Text>
                    <Text fontSize="18px" color="#CCC">
                      {obj.icon}
                    </Text>
                  </Flex>
                  <Text
                    fontSize={{ base: "18px", md: "24px" }}
                    fontWeight="700"
                  >
                    {obj.amount}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box>
        </Flex>

        <Flex
          justify="space-between"
          align={{ base: "start", md: "center" }}
          mb={4}
          direction={{ base: "column", md: "row" }}
          gap={{ base: 4, md: 0 }}
        >
          <Box>
            <Text fontSize={{ base: "20px", md: "24px" }} fontWeight="700">
              {filterTransactionsData?.length
                ? filterTransactionsData.length
                : transactionsData?.length || 0}{" "}
              Transactions
            </Text>
            <Text fontSize="13px" color="#999">
              Your transactions for the last 7 days
            </Text>
          </Box>
          <Flex gap={3} w={{ base: "full", md: "auto" }}>
            <CustomButton
              bg="#F0F0F0"
              color="black"
              fontSize="14px"
              fontWeight="500"
              h="40px"
              px={6}
              borderRadius="full"
              onClick={onOpen}
              _hover={{ bg: "#E5E5E5" }}
              flex={{ base: 1, md: "none" }}
              label={
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  gap={2}
                >
                  Filter
                  <IoChevronDownOutline size={15} />
                </Flex>
              }
            />
            <CustomButton
              bg="#F0F0F0"
              color="black"
              fontSize="14px"
              fontWeight="500"
              h="40px"
              px={6}
              borderRadius="full"
              _hover={{ bg: "#E5E5E5" }}
              flex={{ base: 1, md: "none" }}
              label={
                <Flex
                  justifyContent="space-between"
                  alignItems="center"
                  gap={2}
                >
                  Export list <BsDownload size={15} />
                </Flex>
              }
            />
          </Flex>
        </Flex>

        <Box>
          {loading ? (
            <Flex
              align="center"
              justify="center"
              bg="white"
              p={6}
              borderRadius="12px"
              minH="120px"
              data-testid="loading-state"
            >
              <Text fontSize="16px" color="#999">
                Loading transactions...
              </Text>
            </Flex>
          ) : listToRender.length === 0 ? (
            <Flex
              mx="auto"
              direction="column"
              align="flex-start"
              gap={5}
              justify="center"
              bg="white"
              p={6}
              borderRadius="12px"
              minH="120px"
              maxW="400px"
              data-testid="no-results"
            >
              <CustomButton
                bg="#F0F0F0"
                color="black"
                fontSize="14px"
                fontWeight="500"
                h="48px"
                px={6}
                borderRadius="xl"
                _hover={{ bg: "#E5E5E5" }}
                flex={{ base: 1, md: "none" }}
                label={
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    gap={2}
                  >
                    <IoReceiptOutline />
                  </Flex>
                }
              />
              <Heading as="h2" size="lg">
                No matching transaction found for the selected filter
              </Heading>
              <Text fontSize="16px" color="#999">
                Change your filters to see more results, or add a new product.
              </Text>
              <CustomButton
                label="Clear Filter"
                bg="#F0F0F0"
                color="black"
                fontSize="14px"
                fontWeight="500"
                h="40px"
                px={6}
                borderRadius="full"
                _hover={{ bg: "#E5E5E5" }}
                flex={{ base: 1, md: "none" }}
                onClick={handleClear}
              />
            </Flex>
          ) : (
            listToRender.map((tx, i) => (
              <Flex
                key={i}
                align="center"
                bg="white"
                p={{ base: 3, md: 4 }}
                mb={2}
                borderRadius="12px"
              >
                <Flex
                  align="center"
                  justify="center"
                  w={{ base: "36px", md: "40px" }}
                  h={{ base: "36px", md: "40px" }}
                  borderRadius="full"
                  bg={tx.type === "withdrawal" ? " #FFEBEE" : "#E8F5E9"}
                  mr={{ base: 3, md: 4 }}
                >
                  {tx.type === "withdrawal" ? (
                    <GoArrowUpRight color="#F44336" size={15} />
                  ) : (
                    <GoArrowDownLeft color="#4CAF50" size={15} />
                  )}
                </Flex>
                <Box flex="1" minW="0">
                  <Text
                    fontSize={{ base: "14px", md: "15px" }}
                    fontWeight="600"
                    mb={1}
                    noOfLines={1}
                  >
                    {tx.type === "withdrawal"
                      ? "Cash Withdrawal"
                      : tx.metadata?.product_name ?? "N/A"}
                  </Text>

                  <Text
                    fontSize={{ base: "12px", md: "13px" }}
                    color={
                      tx.type === "withdrawal"
                        ? tx.status === "successful"
                          ? "#4CAF50"
                          : "#FF9800"
                        : "#999"
                    }
                  >
                    {tx.type === "withdrawal"
                      ? tx.status === "successful"
                        ? "Successful"
                        : tx.status
                      : tx.metadata?.name ?? "N/A"}
                  </Text>
                </Box>
                <Box textAlign="right" ml={2}>
                  <Text
                    fontSize={{ base: "14px", md: "15px" }}
                    fontWeight="600"
                    mb={1}
                    whiteSpace="nowrap"
                  >
                    USD {tx.amount}
                  </Text>

                  <Text
                    fontSize={{ base: "11px", md: "13px" }}
                    color="#999"
                    whiteSpace="nowrap"
                  >
                    {formatDate(tx.date)}
                  </Text>
                </Box>
              </Flex>
            ))
          )}
        </Box>
      </Flex>

      <CustomDrawer
        isOpen={isOpen}
        onClose={onClose}
        heading="Filter"
        onApply={handleApply}
        onClear={handleClear}
        isFilterChanged={isFilterChanged}
      >
        <Filter
          ref={filterRef}
          filterValue={transactionsData}
          setFilterTransactionsData={setFilterTransactionsData}
          setIsFilterChanged={setIsFilterChanged}
        />
      </CustomDrawer>
    </Box>
  );
}
