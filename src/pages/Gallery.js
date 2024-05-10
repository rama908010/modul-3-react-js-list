import React, { Component } from "react";
import Card from "../components/Card";
import { Button, Form } from 'react-bootstrap';
import "./Gallery.css";
class Gallery extends Component {
    constructor() {
        super();
        this.state = {
            buku: [],
            keyword: "",
            filterBuku: [],
            judul: "",
            penulis: "",
            penerbit: "",
            coverFile: null,
            harga: 0,
            action: "",
            selectedItem: null,
            isAddBookOpen: false
        };
    }

    componentDidMount() {
        // Fetch data or initialize state.buku
        // Example:
        this.setState({
            buku: [
                { id: 1, judul: "Book 1", penulis: "Author 1", penerbit: "Publisher 1", harga: 100, cover: "url1" },
                { id: 2, judul: "Book 2", penulis: "Author 2", penerbit: "Publisher 2", harga: 200, cover: "url2" },
                // Add more sample data if needed
            ],
            filterBuku: []
        });
    }

    searching = (event) => {
        if (event.keyCode === 13) {
            let keyword = this.state.keyword.toLowerCase();
            let tempBuku = this.state.buku;
            let result = tempBuku.filter((item) => {
                return (
                    item.judul.toLowerCase().includes(keyword) ||
                    item.penulis.toLowerCase().includes(keyword) ||
                    item.penerbit.toLowerCase().includes(keyword)
                );
            });

            this.setState({ filterBuku: result });
        }
    };

    handleChange = (event) => {
        if (event.target.name === "cover") {
            this.setState({ coverFile: event.target.files[0] });
        } else {
            this.setState({ [event.target.name]: event.target.value });
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const { action, judul, penulis, penerbit, harga, coverFile, selectedItem } = this.state;

        // Convert cover file to base64 string for storage or further processing
        const reader = new FileReader();
        reader.onloadend = () => {
            const cover = reader.result; // base64 string

            if (action === "insert") {
                const newBook = {
                    id: Date.now(),
                    judul,
                    penulis,
                    penerbit,
                    harga,
                    cover
                };
                this.setState((prevState) => ({
                    buku: [...prevState.buku, newBook],
                    filterBuku: [...prevState.filterBuku, newBook], // Update filtered list
                    judul: "",
                    penulis: "",
                    penerbit: "",
                    harga: 0,
                    coverFile: null, // Reset cover file state after submission
                    isAddBookOpen: false,
                    action: ""
                }));
            } else if (action === "update" && selectedItem) {
                const index = this.state.buku.findIndex((book) => book.id === selectedItem.id);
                if (index !== -1) {
                    const updatedBook = {
                        ...selectedItem,
                        judul,
                        penulis,
                        penerbit,
                        harga,
                        cover
                    };
                    const updatedBuku = [...this.state.buku];
                    updatedBuku[index] = updatedBook;
                    this.setState({
                        buku: updatedBuku,
                        filterBuku: updatedBuku, // Update filtered list
                        judul: "",
                        penulis: "",
                        penerbit: "",
                        harga: 0,
                        coverFile: null, // Reset cover file state after submission
                        action: "",
                        selectedItem: null,
                        isAddBookOpen: false
                    });
                }
            }
        };
        reader.readAsDataURL(coverFile);
    };

    toggleAddBookForm = () => {
        this.setState((prevState) => ({ isAddBookOpen: !prevState.isAddBookOpen, action: "insert" }));
    };

    render() {
        return (
            <div className="container">
                {/* Add Book Button */}
                <Button onClick={this.toggleAddBookForm}>Tambah Buku</Button>

                {/* Add Book Form */}
                {this.state.isAddBookOpen && (
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formJudul">
                            <Form.Control
                                type="text"
                                name="judul"
                                placeholder="Judul"
                                value={this.state.judul}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPenulis">
                            <Form.Control
                                type="text"
                                name="penulis"
                                placeholder="Penulis"
                                value={this.state.penulis}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPenerbit">
                            <Form.Control
                                type="text"
                                name="penerbit"
                                placeholder="Penerbit"
                                value={this.state.penerbit}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formHarga">
                            <Form.Control
                                type="text"
                                name="harga"
                                placeholder="Harga"
                                value={this.state.harga}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCover">
                            <Form.Control
                                type="file" // Change type to file for cover image upload
                                name="cover"
                                accept="image/*" // Accept only image files
                                onChange={this.handleChange} // Handle file change
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Tambah Buku</Button>
                    </Form>
                )}

                {/* Search Input */}
                <input
                    type="text"
                    className="form-control my-2"
                    placeholder="Pencarian"
                    value={this.state.keyword}
                    onChange={(ev) => this.setState({ keyword: ev.target.value })}
                    onKeyUp={(ev) => this.searching(ev)}
                />

                {/* Display Books */}
                <div className="row">
                    {this.state.filterBuku.length > 0
                        ? this.state.filterBuku.map((item, index) => (
                            <div key={index} className="col-md-3">
                                <Card
                                    judul={item.judul}
                                    penulis={item.penulis}
                                    penerbit={item.penerbit}
                                    harga={item.harga}
                                    cover={item.cover}
                                    onEdit={() => this.Edit(item)}
                                    onDrop={() => this.Drop(item)}
                                />
                            </div>
                        ))
                        : this.state.buku.map((item, index) => (
                            <div key={index} className="col-md-3">
                                <Card
                                    judul={item.judul}
                                    penulis={item.penulis}
                                    penerbit={item.penerbit}
                                    harga={item.harga}
                                    cover={item.cover}
                                    onEdit={() => this.Edit(item)}
                                    onDrop={() => this.Drop(item)}
                                />
                            </div>
                        ))}
                </div>

                {/* Edit Book Form */}
                {this.state.selectedItem && (
                    <Form onSubmit={this.Save}>
                        <Form.Group controlId="formJudul">
                            <Form.Control
                                type="text"
                                name="judul"
                                placeholder="Judul"
                                value={this.state.judul}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPenulis">
                            <Form.Control
                                type="text"
                                name="penulis"
                                placeholder="Penulis"
                                value={this.state.penulis}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPenerbit">
                            <Form.Control
                                type="text"
                                name="penerbit"
                                placeholder="Penerbit"
                                value={this.state.penerbit}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formHarga">
                            <Form.Control
                                type="text"
                                name="harga"
                                placeholder="Harga"
                                value={this.state.harga}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCover">
                            <Form.Control
                                type="file" // Change type to file for cover image upload
                                name="cover"
                                accept="image/*" // Accept only image files
                                onChange={this.handleChange} // Handle file change
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Simpan Perubahan</Button>
                    </Form>
                )}
            </div>
        );
    }

    Edit = (item) => {
        this.setState({
            judul: item.judul,
            penulis: item.penulis,
            penerbit: item.penerbit,
            harga: item.harga,
            action: "update",
            selectedItem: item
        });
    };

    Save = (event) => {
        event.preventDefault();
        const { action, selectedItem, judul, penulis, penerbit, harga, coverFile } = this.state;
        let tempBuku = [...this.state.buku];

        if (action === "update") {
            const index = tempBuku.findIndex((book) => book.id === selectedItem.id);
            if (index !== -1) {
                tempBuku[index] = { ...selectedItem, judul, penulis, penerbit, harga };
            }
        }

        this.setState({
            buku: tempBuku,
            judul: "",
            penulis: "",
            penerbit: "",
            harga: 0,
            coverFile: null,
            action: "",
            selectedItem: null
        });
    };

    Drop = (item) => {
        if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
            let tempBuku = this.state.buku.filter((book) => book.id !== item.id);
            let tempFilterBuku = this.state.filterBuku.filter((book) => book.id !== item.id);
            this.setState({ buku: tempBuku, filterBuku: tempFilterBuku });
        }
    };
}

export default Gallery;
