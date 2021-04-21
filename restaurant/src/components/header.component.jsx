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

export const HeaderComponent = () => (
    <Header
        left={
            <Flex alignVertical="center">
                <IconArrowLeft/>
                <IconLogo size="l"/>
            </Flex>
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
