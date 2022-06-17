import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Divider,
  Text
} from "@chakra-ui/react";
import { ArrowRightIcon, TriangleDownIcon, HamburgerIcon } from '@chakra-ui/icons'

export function Sidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const TextColor="#000000"

  return (
    <>
      <Button colorScheme="whiteAlpha" onClick={onOpen}>
        <ArrowRightIcon color='black' />
      </Button>
      <Drawer blockScrollOnMount size='xs' placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Pague o aluguel</DrawerHeader>
          <DrawerBody pl='0' pr='0'>
            <Button colorScheme="whiteAlpha" onClick={onOpen}>
              <TriangleDownIcon color='black' />
              <Text pl={4} color={TextColor}>Dashboard</Text>
            </Button>
            <Divider />
            <Button colorScheme="whiteAlpha" onClick={onOpen}>
              <HamburgerIcon color='black' />
              <Text pl={4} color={TextColor}>Dívidas</Text>
            </Button>
            <Divider />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
