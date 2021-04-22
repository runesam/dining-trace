import { useState } from 'react';
import { Button, Flex, FormRow, FormRowItem, Input, Text, Util } from 'snacks-design-system';

import { HeaderComponent } from '../header.component';

import './index.css';
import { Link } from 'react-router-dom';

export const HomeComponent = () => {
        const [loading, setLoading] = useState(false);
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

        const getOrders = () => new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: [
                        {
                            id: 1,
                            dateTime: '2021-04-21T15:00',
                            customers: [{phone: '(323) 572-1630', email: 'larry@att.net'}, {phone: '(547) 255-5617', email: 'dunstan@att.net'}]
                        },
                        {
                            id: 2,
                            dateTime: '2021-04-21T16:00',
                            customers: [{phone: '(981) 285-3918', email: 'ryanvm@comcast.net'}, {phone: '(488) 796-4730', email: 'dgriffith@yahoo.com'}]
                        },
                        {id: 3, dateTime: '2021-04-21T17:00', customers: [{ phone: '(601) 835-8977', email: 'leocharre@icloud.com'}]},
                        {
                            id: 4,
                            dateTime: '2021-04-21T18:00',
                            customers: [{phone: '(234) 910-8387', email: 'dbanarse@msn.com'}, {phone: '(493) 286-9547', email: 'cameron@verizon.net'}]
                        },
                    ],
                });
            }, 1000);
        });

        const onSubmit = e => {
            e.preventDefault();
            console.log(formData);
            setLoading(true);
            getOrders().then(({data}) => {
                setOrders(data);
                setLoading(false);
            });
        }

        return (
            <Util>
                <HeaderComponent/>
                <section>
                    <Util padding="var(--space-m)">
                        <form onSubmit={onSubmit}>
                            <FormRow spacing="m">
                                <FormRowItem>
                                    <Input type="datetime-local" name="from" onChange={onChange} value={formData.from}/>
                                </FormRowItem>
                                <FormRowItem>
                                    <Input type="datetime-local" name="until" onChange={onChange} value={formData.until}/>
                                </FormRowItem>
                                <FormRowItem>
                                    <Button modFluid isLoading={loading} disabled={loading} type="submit">List
                                        Orders</Button>
                                </FormRowItem>
                            </FormRow>
                        </form>
                        <div className="new-order">
                            <Link to="/order/new">
                                <Button mode="secondary">New Order</Button>
                            </Link>
                        </div>
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
                                                                {`#${index + 1}: ${customer.email || customer.phone}`}
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
