import React, { useState } from "react";
import { Box, Button, Container, Flex, Heading, IconButton, Input, Stack, Text, Textarea, useDisclosure, VStack } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const NoteCard = ({ note, onDelete }) => (
  <Box p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md">
    <Heading fontSize="xl">{note.title}</Heading>
    <Text mt={4}>{note.content}</Text>
    <IconButton aria-label="Delete note" icon={<FaTrash />} size="sm" variant="ghost" colorScheme="red" onClick={() => onDelete(note.id)} position="absolute" top={2} right={2} />
  </Box>
);

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addNote = () => {
    if (newNote.title || newNote.content) {
      setNotes([...notes, { id: Date.now(), ...newNote }]);
      setNewNote({ title: "", content: "" });
      onClose();
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <Container maxW="container.xl">
      <Flex justifyContent="space-between" alignItems="center" my={8}>
        <Heading>Notes</Heading>
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={onOpen}>
          Add Note
        </Button>
      </Flex>
      {isOpen && (
        <Box mb={8}>
          <Input placeholder="Title" mb={3} value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} />
          <Textarea placeholder="Take a note..." mb={3} value={newNote.content} onChange={(e) => setNewNote({ ...newNote, content: e.target.value })} />
          <Button onClick={addNote} colorScheme="teal">
            Save
          </Button>
        </Box>
      )}
      <VStack spacing={8}>
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={deleteNote} />
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
