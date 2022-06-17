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
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { FirebaseAdapter } from "../../services/index";
// @ts-ignore
import CurrencyInput from "react-currency-masked-input";

interface Debit {
  id?: string;
  title: string;
  value: string;
  dueDate: string;
  installments: string;
}

export function DebitsPage() {
  const [debits, setDebits] = useState<Debit[]>([]);
  const [title, setTitle] = useState<string>("");
  const [installments, setInstallment] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const convertDate = (date: string) => {
    return new Date(date).toLocaleDateString("pt-BR", { timeZone: "UTC" });
  };

  const handleSubmit = useCallback(async () => {
    const amount = parseFloat(value).toFixed(3);
    const payload = {
      title,
      installments,
      value: (Number(amount) * 10).toFixed(2).toString(),
      dueDate,
    };
    await FirebaseAdapter.addDocumentOnCollection("debits", payload);
    setDebits([...debits, payload]);
    onClose();
  }, [title, installments, value, dueDate]);

  useEffect(() => {
    FirebaseAdapter.getFirebaseCollection("debits").then(setDebits);
  }, []);

  return (
    <Box w="100%" height="95vh" p={4} color="white">
      <Flex alignItems="center" justifyContent="space-between" wrap="wrap">
        {debits.map((debit, index) => (
          <Box {...CardStyles} _hover={CardHoverStyles} key={index}>
            <Text as="h2">{debit.title}</Text>
            <Text {...CardDescription}>Valor: R$ {debit.value}</Text>
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
      {/* @ts-ignore */}
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Cadastro de conta
            </AlertDialogHeader>

            <AlertDialogBody>
              <form>
                <FormControl>
                  <FormLabel htmlFor="title">Título da conta</FormLabel>
                  <Input
                    id="title"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl mt="14px">
                  <FormLabel htmlFor="installments">Parcelas</FormLabel>
                  <Input
                    id="installments"
                    type="text"
                    onChange={(e) => setInstallment(e.target.value)}
                  />
                </FormControl>
                <FormControl mt="14px">
                  <FormLabel htmlFor="value">Valor (R$)</FormLabel>
                  <Input
                    id="value"
                    type="text"
                    as={CurrencyInput}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </FormControl>
                <FormControl mt="14px">
                  <FormLabel htmlFor="due-date">Data de vencimento</FormLabel>
                  <Input
                    id="due-date"
                    type="date"
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </FormControl>
              </form>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" onClick={onClose}>
                Fechar
              </Button>
              <Button onClick={handleSubmit} ml={3}>
                Criar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}
