import React, { useReducer, useState } from "react";
import {
    Button,
    Form,
    Container,
    Row,
    Col,
    ListGroup,
    InputGroup,
} from "react-bootstrap";

function listReducer(state, action) {
    switch (action.type) {
        case "ADD_ITEM":
            return {
                ...state,
                items: [...state.items, action.item],
            };
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.id),
            };
        case "EDIT_ITEM":
            return {
                ...state,
                items: state.items.map((item) =>
                    item.id === action.id ? { ...item, name: action.newName } : item
                ),
            };
        case "SET_SORT":
            return { ...state, sortBy: action.sortBy };
        case "SET_SEARCH":
            return { ...state, searchTerm: action.searchTerm };
        default:
            return state;
    }
}

const initialState = {
    items: [],
    sortBy: "created",
    searchTerm: "",
};

function ItemList() {
    const [state, dispatch] = useReducer(listReducer, initialState);
    const [newItemName, setNewItemName] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const handleAddItem = () => {
        if (newItemName.trim()) {
            const newItem = {
                id: Date.now(),
                name: newItemName.trim(),
                createdAt: new Date().toISOString(),
            };
            dispatch({ type: "ADD_ITEM", item: newItem });
            setNewItemName("");
        }
    };

    const handleRemoveItem = (id) => {
        dispatch({ type: "REMOVE_ITEM", id });
    };

    const handleEdit = (id, currentText) => {
        setEditingId(id);
        setEditingText(currentText);
    };

    const handleSaveEdit = (id) => {
        dispatch({ type: "EDIT_ITEM", id, newName: editingText });
        setEditingId(null);
        setEditingText("");
    };

    const handleSortChange = (e) => {
        dispatch({ type: "SET_SORT", sortBy: e.target.value });
    };

    const handleSearchChange = (e) => {
        dispatch({ type: "SET_SEARCH", searchTerm: e.target.value });
    };

    const filteredItems = state.items
        .filter((item) =>
            item.name.toLowerCase().includes(state.searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (state.sortBy === "alphabet") {
                return a.name.localeCompare(b.name);
            } else {
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

    return (
        <Container className="mt-4">
            <Row className="mb-3">
                <Col md={4}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            placeholder="Enter item name"
                            onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                        />
                        <Button variant="primary" onClick={handleAddItem}>
                            Add
                        </Button>
                    </InputGroup>
                </Col>
                <Col md={4}>
                    <Form.Select value={state.sortBy} onChange={handleSortChange}>
                        <option value="created">Sort by Created Time</option>
                        <option value="alphabet">Sort by Alphabet</option>
                    </Form.Select>
                </Col>
                <Col md={4}>
                    <Form.Control
                        type="text"
                        placeholder="Search items..."
                        value={state.searchTerm}
                        onChange={handleSearchChange}
                    />
                </Col>
            </Row>

            <h3 className="mb-3">Item List:</h3>
            <ListGroup>
                {filteredItems.map((item) => (
                    <ListGroup.Item
                        key={item.id}
                        className="d-flex justify-content-between align-items-center"
                    >
                        {editingId === item.id ? (
                            <>
                                <Form.Control
                                    value={editingText}
                                    onChange={(e) => setEditingText(e.target.value)}
                                    className="me-2"
                                />
                                <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() => handleSaveEdit(item.id)}
                                >
                                    Save
                                </Button>
                            </>
                        ) : (
                            <>
                                <div>
                                    <strong>{item.name}</strong>
                                    <br />
                                </div>
                                <div>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleEdit(item.id, item.name)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </>
                        )}
                    </ListGroup.Item>
                ))}
                {filteredItems.length === 0 && (
                    <ListGroup.Item className="text-center text-muted">
                        No items found.
                    </ListGroup.Item>
                )}
            </ListGroup>
        </Container>
    );
}

export default ItemList;
