import React, { useEffect, useState } from "react";
import { Button, Card, Grid, Icon, Image, Table } from "semantic-ui-react";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";
import { Link, useNavigate } from "react-router-dom";
import { sliceUrl } from "./sliceUrl";
import { useParams } from "react-router-dom";

function Page() {
    const [apiData, setApiData] = useState([]);
    console.log(apiData, "ini data penyimpanan");
    const [meta, setMeta] = useState([]);
    const { page } = useParams();
    console.log(page, "ini page yang di-klik");
    const navigate = useNavigate();

    // untuk get semua data
    useEffect(() => {
        const fetch = async (pageNumber = page) => {
            try {
                const { data } = await axios.get(
                    `http://apilaravel.masuk.web.id/api/products?page=${pageNumber}`
                );
                console.log(data.data, "ini data dari api langsung");
                setApiData(data.data);
                setMeta(data.meta.links);
            } catch (err) {
                console.error(err);
            }
        };
        fetch();
    }, []);

    // untuk get 1 paginate
    const fetchPaginate = async (pageNumber = page) => {
        try {
            const { data } = await axios.get(
                `http://apilaravel.masuk.web.id/api/products?page=${pageNumber}`
            );
            console.log(data.data, "ini data dari api langsung PAGINATE");
            setApiData(data.data);
            setMeta(data.meta.links);
        } catch (err) {
            console.error(err);
        }
    };

    const setData = (slug) => {
        // console.log(slug);
        localStorage.setItem("SLUG", slug);
    };

    const getData = () => {
        axios
            .get(`http://apilaravel.masuk.web.id/api/products`)
            .then((getData) => {
                setApiData(getData.data.data);
            });
    };

    const onDelete = (deleteSlug) => {
        try {
            axios
                .delete(
                    `http://apilaravel.masuk.web.id/api/products/${deleteSlug}`
                )
                .then(() => {
                    getData();
                });
        } catch (error) {
            console.log(error, "tombol hapus error... coba liat API nya!");
        }
    };

    return (
        <div style={{ padding: 30 }}>
            <Link to="/create" style={{ display: "block", marginBottom: 10 }}>
                <Button color="blue">CREATE</Button>
            </Link>

            <Grid relaxed columns={4} style={{ marginBottom: 10 }}>
                {apiData.map((data) => {
                    return (
                        <Grid.Column>
                            <Card key={data.id}>
                                <Image
                                    src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                                    wrapped
                                    ui={false}
                                />

                                <Card.Content>
                                    <Table.Cell>
                                        <Link to={`/product/${data.slug}`}>
                                            <Button
                                                color="yellow"
                                                style={{ padding: 15 }}
                                            >
                                                SHOW
                                            </Button>
                                        </Link>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Link to="/update">
                                            <Button
                                                color="green"
                                                onClick={() =>
                                                    setData(data.slug)
                                                }
                                                style={{ padding: 15 }}
                                            >
                                                UPDATE
                                            </Button>
                                        </Link>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Button
                                            color="red"
                                            onClick={() => onDelete(data.slug)}
                                            style={{ padding: 15 }}
                                        >
                                            DELETE
                                        </Button>
                                    </Table.Cell>

                                    <Card.Description>
                                        {data.name}
                                    </Card.Description>
                                </Card.Content>

                                <Card.Content extra>
                                    <a>
                                        <Icon name="dollar" />
                                        {data.price}
                                    </a>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    );
                })}
            </Grid>

            {meta.map((link, index) => {
                return (
                    <button
                        key={index}
                        disabled={link.url == null && "disabled"}
                        onClick={() =>
                            navigate(`/product/pages/${sliceUrl(link.url)}`)
                        }
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        style={{ padding: 10, border: 1, margin: 7 }}
                    />
                );
            })}
            <Button color="grey" onClick={() => fetchPaginate()}>
                DATA BARU
            </Button>
        </div>
    );
}

export default Page;
