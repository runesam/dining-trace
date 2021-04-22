import { useEffect, useState } from 'react';
import { Flex, Text, Util } from 'snacks-design-system';

import { HeaderComponent } from '../header.component';

import './index.css';

export const OrderAffectedCustomersComponent = (props) => {
        const headers = ['ID', 'DateTime', 'PhoneNumber', 'Email'];
        const [customers, setCustomers] = useState([]);

        const getCustomers = () => Promise.resolve({
            data: [
                {id: 1, dateTime: '2021-04-21T15:00', phoneNumber: '(323) 572-1630', email: 'larry@att.net'},
                {id: 2, dateTime: '2021-04-21T15:30', phoneNumber: '(723) 945-2539', email: 'bmcmahon@yahoo.com'},
                {id: 3, dateTime: '2021-04-21T15:40', phoneNumber: '(663) 795-3739', email: 'budinger@live.com'},
                {id: 4, dateTime: '2021-04-21T15:45', phoneNumber: '(544) 247-4852', email: 'oevans@att.net'},
                {id: 5, dateTime: '2021-04-21T16:15', phoneNumber: '(294) 492-3632', email: 'reeds@sbcglobal.net'},
                {id: 6, dateTime: '2021-04-21T17:05', phoneNumber: '(570) 448-1820', email: 'ninenine@hotmail.com'},
                {id: 7, dateTime: '2021-04-21T17:13', phoneNumber: '(472) 592-9935', email: 'parksh@mac.com'},
            ],
        });

        useEffect(() => {
            console.log(props);
            const { orderId } = props.match.params
            getCustomers(orderId).then(({data}) => setCustomers(data));
        }, [props, props.match.params]);

        const handleGoBack = () => {
            props.history.push('/');
        };

        return (
            <Util>
                <HeaderComponent goBack={handleGoBack}/>
                <section>
                    {/*<Util padding="var(--space-m)">*/}
                    {/*    <form onSubmit={onSubmit}>*/}
                    {/*        <FormRow spacing="m">*/}
                    {/*            <FormRowItem>*/}
                    {/*                <Input type="date" name="from" onChange={onChange} value={formData.from}/>*/}
                    {/*            </FormRowItem>*/}
                    {/*            <FormRowItem>*/}
                    {/*                <Input type="date" name="until" onChange={onChange} value={formData.until}/>*/}
                    {/*            </FormRowItem>*/}
                    {/*            <FormRowItem>*/}
                    {/*                <Button modFluid type="submit">List Orders</Button>*/}
                    {/*            </FormRowItem>*/}
                    {/*        </FormRow>*/}
                    {/*    </form>*/}
                    {/*</Util>*/}
                    {Boolean(customers.length) && (
                        <div className="table-header">
                            <Flex alignVertical="start" alignHorizontal="start">
                                {headers.map((i, index) => (
                                    <div
                                        key={i + index}
                                        style={{width: index === 0 ? '10%' : '30%' }}
                                    >
                                        <Text size="var(--fz-l)" lineHeight="var(--lh-loose)"><b>{i}</b></Text>
                                    </div>
                                ))}
                            </Flex>
                            <Flex alignVertical="start" alignHorizontal="start">
                                {customers.map(customer => (
                                    <div key={customer.id} className="customer">
                                        <Flex alignVertical="start" alignHorizontal="start">
                                            <div style={{width: '10%'}}>
                                                <Text size="var(--fz-l)" lineHeight="var(--lh-loose)">{customer.id}</Text>
                                            </div>
                                            <div style={{width: '30%'}}>
                                                <Text size="var(--fz-l)"
                                                      lineHeight="var(--lh-loose)">{customer.dateTime}</Text>
                                            </div>
                                            <div style={{width: '30%'}}>
                                                <Text size="var(--fz-l)"
                                                      lineHeight="var(--lh-loose)">{customer.phoneNumber}</Text>
                                            </div>
                                            <div style={{width: '30%'}}>
                                                <Text size="var(--fz-l)"
                                                      lineHeight="var(--lh-loose)">{customer.email}</Text>
                                            </div>
                                        </Flex>
                                    </div>
                                ))}
                            </Flex>
                        </div>
                    )}
                </section>
            </Util>
        );
    }
;
