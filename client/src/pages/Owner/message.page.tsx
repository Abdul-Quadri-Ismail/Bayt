import { Box, Container, Flex } from "@chakra-ui/react";
import ConversationPanel from "@components/ConversationPanel.component";
import MessageListPanel from "@components/MessageListPanel.component";
import { useOwnerMessages } from "@hooks/useApi";
import React, { useState } from "react";
import { io } from "socket.io-client";

export default function Message() {
 
   const { data: message, error } = useOwnerMessages();

   const [id, setId] = useState<string>("");
   const [tenantID, setTenantID] = useState<string>("");
   const [ownerID, setOwnerID] = useState<string>("");

   const handleMessageDetails = (
      messageID: string,
      tenantID: string,
      ownerId: string
   ) => {
      setId(messageID);
      setTenantID(tenantID);
      setOwnerID(ownerId);
   };

   return (
      <>
         <Box w='full'>
            <Container
               maxW='container.xl'
               rounded='md'
               mt={5}
               px={0}
               bgColor='white'
               h='2xl'>
               <Flex w='full' h='full'>
                  <MessageListPanel
                     type='owner'
                     messageList={message}
                     getMessageDetails={handleMessageDetails}
                  />
                  <ConversationPanel
                     messageID={id!}
                     type='owner'
                      tenant_id={tenantID!}
                     owner_id={ownerID}
                  />
               </Flex>
            </Container>
         </Box>
      </>
   );
}
