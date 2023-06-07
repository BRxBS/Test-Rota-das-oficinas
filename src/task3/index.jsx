import React, { useState } from "react";
import { Header } from "../components/header";
import "./style.scss";

export function Task3() {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [billResult, setBillResult] = useState(null);

    const addProduct = () => {
        if (selectedProduct !== "") {
            setProducts([
                ...products,
                {
                    name: selectedProduct,
                    price: 0,
                    consumers: [],
                    consumption: {},
                },
            ]);
            setSelectedProduct("");
        }
    };

    const setConsumption = (productIndex, customerIndex, consumption) => {
        const updatedProducts = [...products];
        updatedProducts[productIndex].consumption[customerIndex] = consumption;
        setProducts(updatedProducts);
    };

    const addCustomer = () => {
        if (selectedCustomer !== "") {
            setCustomers([
                ...customers,
                { name: selectedCustomer, includeServiceCharge: false },
            ]);
            setSelectedCustomer("");
        }
    };

    const setProductPrice = (index, price) => {
        const updatedProducts = [...products];
        updatedProducts[index].price = parseFloat(price);
        setProducts(updatedProducts);
    };

    const assignProductToCustomer = (productIndex, customerIndex) => {
        const updatedProducts = [...products];
        const consumers = updatedProducts[productIndex].consumers;

        const isConsumer = consumers.includes(customerIndex);

        if (isConsumer) {
            updatedProducts[productIndex].consumers = consumers.filter(
                (consumer) => consumer !== customerIndex
            );
        } else {
            if (consumers.length < 2) {
                updatedProducts[productIndex].consumers = [
                    ...consumers,
                    customerIndex,
                ];
            }
        }

        setProducts(updatedProducts);
    };

    const toggleServiceCharge = (index) => {
        const updatedCustomers = [...customers];
        updatedCustomers[index].includeServiceCharge =
            !updatedCustomers[index].includeServiceCharge;
        setCustomers(updatedCustomers);
    };

    const calculateBill = () => {
        const customerAmounts = {};

        customers.forEach((customer, customerIndex) => {
            customerAmounts[customer.name] = 0;
            products.forEach((product) => {
                if (product.consumption[customerIndex]) {
                    const productAmount = parseFloat(product.price);
                    const consumptionQuantity =
                        product.consumption[customerIndex];
                    const amountPerConsumer =
                        productAmount / consumptionQuantity;
                    customerAmounts[customer.name] += amountPerConsumer;
                }
            });

            if (customer.includeServiceCharge) {
                customerAmounts[customer.name] *= 1.1;
            }
        });

        const billResult = Object.keys(customerAmounts).map((customer) => {
            return { name: customer, amount: customerAmounts[customer] };
        });

        setBillResult(billResult);
    };

    return (
        <>
            <Header />
            <div className="container-bill">
                <h2>Calculadora de Divisão de Conta</h2>
                <div className="content">
                    <div className="container-products">
                        <label className="product-name">
                            Nome dos produtos:
                            <input
                                type="text"
                                value={selectedProduct}
                                onChange={(e) =>
                                    setSelectedProduct(e.target.value)
                                }
                            />
                            <button onClick={addProduct}>Adicionar</button>
                        </label>
                        <ul>
                            {products.map((product, index) => (
                                <li key={index}>
                                    <div className="inputs-wrapper">
                                        <span className="name">
                                            {" "}
                                            {product.name}
                                        </span>
                                        <div>
                                            <span className="value">
                                                Valor do Produto{" "}
                                            </span>
                                            R$:{" "}
                                            <input
                                                className="number"
                                                type="number"
                                                value={product.price}
                                                onChange={(e) =>
                                                    setProductPrice(
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div className="constumer-check">
                                        <p>Quem consumiu esse produto?</p>
                                        <div>
                                            <div></div>
                                            {customers.map(
                                                (customer, customerIndex) => (
                                                    <div
                                                        className="wrapper"
                                                        key={customerIndex}
                                                    >
                                                        <div className="divOne">
                                                            {customer.name}
                                                            <input
                                                                type="checkbox"
                                                                checked={product.consumers.includes(
                                                                    customerIndex
                                                                )}
                                                                onChange={() =>
                                                                    assignProductToCustomer(
                                                                        index,
                                                                        customerIndex
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                        <div className="divTwo">
                                                            Quantidade:
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                value={
                                                                    product
                                                                        .consumption[
                                                                        customerIndex
                                                                    ]
                                                                        ? product
                                                                              .consumption[
                                                                              customerIndex
                                                                          ]
                                                                        : ""
                                                                }
                                                                onChange={(e) =>
                                                                    setConsumption(
                                                                        index,
                                                                        customerIndex,
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="constumers-wrapper">
                        <label className="label-clients">
                            Clientes:
                            <input
                                type="text"
                                value={selectedCustomer}
                                onChange={(e) =>
                                    setSelectedCustomer(e.target.value)
                                }
                            />
                            <button onClick={addCustomer}>Adicionar</button>
                        </label>
                        <div className="checkDiv">
                            {customers > 1 ? (
                                <div></div>
                            ) : (
                                <span> Quem irá pagar os 10% ?</span>
                            )}

                            <ul>
                                {customers.map((customer, index) => (
                                    <li key={index}>
                                        <input
                                            type="checkbox"
                                            checked={
                                                customer.includeServiceCharge
                                            }
                                            onChange={() =>
                                                toggleServiceCharge(index)
                                            }
                                        />
                                        {customer.name}{" "}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="calculate">
                        <div className="button">
                            <button onClick={calculateBill}>
                                Calcular Conta
                            </button>
                        </div>
                        {billResult && (
                            <div>
                                <h3>Resultado</h3>
                                <ul>
                                    {billResult.map((result, index) => (
                                        <li key={index}>
                                            {result.name}: R${" "}
                                            {result.amount.toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
