import { useState } from 'react';
import { Button, Flex, FormRow, FormRowItem, Input, Text, Util } from 'snacks-design-system';

import { HeaderComponent } from '../header.component';

import './index.css';
import { Link } from 'react-router-dom';

export const HomeComponent = () => {
        const headers = ['ID', 'DateTime', 'Customers'];
        const [orders, setOrders] = useState([]);
        const [formData, setFormData] = useState({from: '', until: ''});

        const onChange = e => {
            const {name, value} = e.target;
            console.log(name);
            setFormData({
                ...formData,
                [name]: value,
            });
        }

        const getOrders = () => Promise.resolve({
            data: [
                {
                    id: 1,
                    dateTime: new Date().toISOString(),
                    customers: [{phone: 123, email: 'asda@asda.com'}, {phone: 222, email: 'tes@as.com'}]
                },
                {
                    id: 2,
                    dateTime: new Date().toISOString(),
                    customers: [{phone: 123, email: 'asda@asda.com'}, {phone: 222, email: 'tes@as.com'}]
                },
                {id: 3, dateTime: new Date().toISOString(), customers: [{phone: 222, email: 'tes@as.com'}]},
                {
                    id: 4,
                    dateTime: new Date().toISOString(),
                    customers: [{phone: 123, email: 'asda@asda.com'}, {phone: 222, email: 'tes@as.com'}]
                },
            ],
        });

        const onSubmit = e => {
            e.preventDefault();
            console.log(formData);
            getOrders().then(({data}) => setOrders(data));
        }

        return (
            <Util>
                <HeaderComponent/>
                <section>
                    <Util padding="var(--space-m)">
                        <form onSubmit={onSubmit}>
                            <FormRow spacing="m">
                                <FormRowItem>
                                    <Input type="date" name="from" onChange={onChange} value={formData.from}/>
                                </FormRowItem>
                                <FormRowItem>
                                    <Input type="date" name="until" onChange={onChange} value={formData.until}/>
                                </FormRowItem>
                                <FormRowItem>
                                    <Button modFluid type="submit">List Orders</Button>
                                </FormRowItem>
                            </FormRow>
                        </form>
                    </Util>
                    {Boolean(orders.length) && (
                        <div className="table-header">
                            <Flex alignVertical="start" alignHorizontal="start">
                                {headers.map((i, index) => (
                                    <div
                                        key={i + index}
                                        style={{width: index === 0 ? '10%' : index === 1 ? '30%' : '60%'}}
                                    >
                                        <Text size="var(--fz-l)" lineHeight="var(--lh-loose)"><b>{i}</b></Text>
                                    </div>
                                ))}
                            </Flex>
                            <Flex alignVertical="start" alignHorizontal="start">
                                {orders.map(order => (
                                    <Link key={order.id} to={`/order-affected-customers/${order.id}`}>
                                        <div className="order">
                                            <Flex alignVertical="start" alignHorizontal="start">
                                                <div style={{width: '10%'}}>
                                                    <Text size="var(--fz-l)" lineHeight="var(--lh-loose)">{order.id}</Text>
                                                </div>
                                                <div style={{width: '30%'}}>
                                                    <Text size="var(--fz-l)"
                                                          lineHeight="var(--lh-loose)">{order.dateTime}</Text>
                                                </div>
                                                <div style={{width: '60%'}}>
                                                    <Flex alignVertical="center" alignHorizontal="start" key={order.id}>
                                                        {order.customers.map((customer, index) => (
                                                            <Text key={customer.phone || customer.email} size="var(--fz-l)"
                                                                  lineHeight="var(--lh-loose)">
                                                                {`#${index + 1}: ${customer.phone || customer.email}`}
                                                            </Text>
                                                        ))}
                                                    </Flex>
                                                </div>
                                            </Flex>
                                        </div>
                                    </Link>
                                ))}
                            </Flex>
                        </div>
                    )}
                </section>
            </Util>
        );
    }
;
