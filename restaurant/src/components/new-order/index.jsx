import { HeaderComponent } from '../header.component';
import { Button, FormRow, FormRowItem, Input, Text, Util } from 'snacks-design-system';
import { useState } from 'react';

export const NewOrderComponent = props => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        diningTime: '',
        customers: [{
            phone: '',
            email: '',
        }],
    });

    const onChange = e => {
        const {name, value} = e.target;

        if (name.includes('.email') || name.includes('.phone')) {
            const [index, fieldName] = name.split('.');
            const temp = JSON.parse(JSON.stringify(formData.customers));
            temp[index][fieldName] = value;

            return setFormData({
                ...formData,
                customers: temp,
            });
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmitDate = () => new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 1000);
    });

    const onSubmit = e => {
        console.log(formData);
        e.preventDefault();
        setLoading(true);
        handleSubmitDate().then(() => {
            props.history.push('/');
        });
    };

    const addCustomer = () => {
        setFormData({
            ...formData,
            customers: [
                ...formData.customers,
                {
                    phone: '',
                    email: '',
                }
            ]
        })
    }

    const handleGoBack = () => {
        props.history.push('/');
    };

    return (
        <Util>
            <HeaderComponent goBack={handleGoBack} />
            <section>
                <Util padding="var(--space-m)">
                    <form onSubmit={onSubmit}>
                        <FormRow spacing="m">
                            <FormRowItem>
                                <Text size="var(--fz-l)" lineHeight="var(--lh-loose)"><b>Dining Time</b></Text>
                                <Input type="datetime-local" name="diningTime" onChange={onChange}
                                       value={formData.diningTime}/>
                            </FormRowItem>
                        </FormRow>
                        <Text size="var(--fz-l)" lineHeight="var(--lh-loose)"><b>Customers</b></Text>
                        {formData.customers.map((customer, index) => (
                            <Util key={index}>
                                <Text size="var(--fz-l)" lineHeight="var(--lh-loose)">{`Customer ${index + 1}`}</Text>
                                <FormRow>
                                    <FormRowItem>
                                        <Input type="email" name={`${index}.email`} onChange={onChange}
                                               value={formData.customers[index].email} placeholder="email"/>
                                    </FormRowItem>
                                    <FormRowItem>
                                        <Input type="phone" name={`${index}.phone`} onChange={onChange}
                                               value={formData.customers[index].phone} placeholder="phone"/>
                                    </FormRowItem>
                                </FormRow>
                            </Util>
                        ))}
                        <FormRow>
                            <FormRowItem>
                                <Button onClick={addCustomer}>Add Customer</Button>
                            </FormRowItem>
                        </FormRow>
                        <FormRow>
                            <FormRowItem>
                                <Button
                                    modFluid
                                    type="submit"
                                    isLoading={loading}
                                    disabled={loading}
                                >
                                    Add Order
                                </Button>
                            </FormRowItem>
                        </FormRow>
                    </form>
                </Util>
            </section>
        </Util>
    );
};
