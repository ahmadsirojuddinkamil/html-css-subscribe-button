import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "semantic-ui-react";

function Detail() {
    const { slug } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await axios.get(
                    `http://apilaravel.masuk.web.id/api/products/${slug}`
                );
                setProduct(data.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetch();
    }, []);

    return (
        <div style={{ padding: 20 }}>
            <h2>Programming</h2>

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Deskipsi</Table.HeaderCell>
                        <Table.HeaderCell>Harga</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    <Table.Row>
                        <Table.Cell>{product.name}</Table.Cell>
                        <Table.Cell>{product.description}</Table.Cell>
                        <Table.Cell>{product.price}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
        </div>
    );
}

export default Detail;
