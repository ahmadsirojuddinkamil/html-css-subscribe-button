import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import { useNavigate } from "react-router-dom";

function Create() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category_id, setCategory_id] = useState("");

    const sendDataToAPI = () => {
        try {
            axios
                .post(`http://apilaravel.masuk.web.id/api/products`, {
                    name,
                    description,
                    price,
                    category_id,
                })
                .then(() => {
                    navigate("/product");
                });

            console.log("berhasil create data");
        } catch (error) {
            console.log(error, "error coba cek api nya");
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Create</h2>

            <Form>
                <Form.Field>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Field>

                <Form.Field style={{ marginTop: 50 }}>
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Field>

                <Form.Field style={{ marginTop: 50 }}>
                    <label>Price</label>
                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Form.Field>

                <Form.Field style={{ marginTop: 50 }}>
                    <label>Category</label>
                    <input
                        type="number"
                        name="category_id"
                        placeholder="Category"
                        onChange={(e) => setCategory_id(e.target.value)}
                    />
                </Form.Field>

                <Button
                    type="submit"
                    onClick={sendDataToAPI}
                    style={{ marginTop: 20 }}
                >
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default Create;
