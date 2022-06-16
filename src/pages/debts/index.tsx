import { DEBITS_MOCK_DATA } from "../../data/mocs/debits";
import {
  Box,
  BoxProps,
  Flex,
  IconButton,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";

export function DebitsPage() {
  const [debits, setDebits] = useState(DEBITS_MOCK_DATA);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()

  const CardStyles: BoxProps = {
    borderRadius: "5px",
    boxShadow: "7px 7px 13px 0px rgba(50, 50, 50, 0.22)",
    padding: "30px",
    margin: "20px",
    width: "400px",
    transition: "all 0.3s ease-out",
    color: "#000000",
    borderLeft: "3px solid #4895ff",
    p: 4,
  };

  const CardHoverStyles: BoxProps = {
    transform: "translateY(-5px)",
    cursor: "pointer",
  };

  const CardDescription: BoxProps = {
    color: "#a3a5ae",
    fontSize: "14px",
  };

  const convertDate = (date: number) => {
    return new Date(date).toLocaleDateString("pt-BR");
  };

  return (
    <Box w="100%" height="95vh" p={4} color="white">
      <Flex alignItems="center" justifyContent="space-between" wrap="wrap">
        {debits.map((debit, index) => (
          <Box {...CardStyles} _hover={CardHoverStyles} key={index}>
            <Text as="h2">{debit.accountName}</Text>
            <Text {...CardDescription}>Valor: {debit.value}</Text>
            <Text {...CardDescription}>Parcelas: {debit.installments}</Text>
            <Text {...CardDescription}>
              Vencimento: {convertDate(debit.dueDate)}
            </Text>
          </Box>
        ))}
      </Flex>
      <IconButton
        variant="outline"
        colorScheme="teal"
        aria-label="Call Sage"
        fontSize="20px"
        icon={<AddIcon />}
        position={"fixed"}
        bottom="40px"
        right="40px"
        onClick={onOpen}
      />
      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
