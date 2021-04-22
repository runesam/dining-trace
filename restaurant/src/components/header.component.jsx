import {
    Flex,
    Header,
    IconArrowLeft,
    IconHamburger,
    IconLogo,
    IconPlaceholder,
    Text,
    Util
} from 'snacks-design-system';

export const HeaderComponent = props => (
    <Header
        left={
            <button className="back-button" onClick={props.goBack}>
                <Flex alignVertical="center">
                    {props.goBack && <IconArrowLeft/>}
                    <IconLogo size="l"/>
                </Flex>
            </button>
        }
        modAutoWidth
        right={
            <Flex>
                <Util marginRight="var(--space-m)">
                    <IconPlaceholder/>
                </Util>
                <IconHamburger/>
            </Flex>
        }
    >
        <Text modTruncate>
            <strong>Restaurant Home Page</strong>
        </Text>
    </Header>
);
