import { Table } from "@/Common";
import { Nav } from "@/Components";
import { ThemeColors } from "@/Utility";
import { Badge, Box, Button, Flex, IconButton, Stack, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";

import { FaUserPlus } from "react-icons/fa";
import { MdOutlineRefresh } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
const Users = ({ colorMode }) => {
    const TabsButtons = [
        {
            Tab: "Users",
            Icon: ""
        },

        {
            Tab: "Trial Users",
            Icon: ""
        },

        {
            Tab: "Free",
            Icon: ""
        },

        {
            Tab: "Expired",
            Icon: ""
        },

    ]

    const [ActiveTab, setActiveTab] = useState("")
    const { Rtl } = useSelector((state) => state.Helper);
    const THeadData = [
        {
            Label: "Status_Last Seen",
            Sort: "",
            OrderBy: "Status_Last Seen",
            size: "12rem"
        },
        {
            Label: "Type",
            Sort: "",
            OrderBy: "Type",
            size: "12rem"
        },
        {
            Label: "UsersCount",
            Sort: "",
            OrderBy: "UsersCount",
            size: "14rem"
        },
        {
            Label: "Device Count",
            Sort: "",
            OrderBy: "DataStatus",
            size: "6.4rem"
        },
        {
            Label: "UserName",
            Sort: "",
            OrderBy: "DataArea",
            size: "10.77rem"
        },
        {
            Label: "WhatsApp",
            Sort: "",
            OrderBy: "DataAcres_ProjectArea",
            size: Rtl ? "5.2rem" : "5rem"
        },
        {
            Label: "Email Adress",
            Sort: "",
            OrderBy: "DataPolicy",
            size: Rtl ? "7.2rem" : "6.2rem"
        },
        {
            Label: "Company Name",
            Sort: "",
            OrderBy: "DataPolicy",
            size: "6.4rem"
        }
        , {
            Label: "Data Created",
            Sort: "",
            OrderBy: "DataPolicy",
            size: "6.4rem"
        }
        , {
            Label: "Verify Data",
            Sort: "",
            OrderBy: "DataPolicy",
            size: "6.4rem"
        }
        , {
            Label: "Data Expiry ",
            Sort: "",
            OrderBy: "DataPolicy",
            size: "6.4rem"
        }
        , {
            Label: "Support ",
            Sort: "",
            OrderBy: "DataPolicy",
            size: "6.4rem"
        }
    ];


    const DataNumber = [
        {
            Name: "Users",
            Number: "365",

        }
        ,
        {
            Name: "Total",
            Number: "36",

        }
        ,
        {
            Name: "Online",
            Number: "365",

        }
        ,
        {
            Name: "Active",
            Number: "32",

        },
        {
            Name: "Pending",
            Number: "3",

        },
        {
            Name: "NotActive",
            Number: "36",

        }

    ]

    return (
        <div >
            <Nav colorMode={colorMode} />
            <Box pt="1rem" px="1rem">
                <Tabs variant='enclosed-colored'
                >
                    <TabList
                        alignItems={"center"}
                        gap="0.5rem"
                        display={"flex"} justifyContent={"center"}
                    >

                        {TabsButtons?.map((tab, index) => {
                            return (
                                <Tab
                                    key={`Admin_Users_Tab${index}`}

                                    _selected={{
                                        backgroundColor: ThemeColors.Admin.BgActiveTabs[colorMode],

                                    }}
                                    onClick={() => setActiveTab(tab.Tab)}

                                    border={"2px solid "}
                                    borderTopRightRadius={"0.6rem"}
                                    borderTopLeftRadius={"0.6rem"}
                                    borderColor={ThemeColors.Admin.BorderColorTabs[colorMode]}

                                >{tab.Tab}</Tab>
                            )
                        })}

                    </TabList>

                    {/* <TabPanels>
                        <TabPanel>
                            <Table THeadData={THeadData} />
                        </TabPanel>

                    </TabPanels > */}

                </Tabs>

                <Box pt="2rem"  >

                    {/*====================== Free  and  Users ===============  */}
                    <Flex px={"0.5rem"} justifyContent={"space-between"} alignItems={"center"}>
                        <Flex alignItems={"center"} gap={"1.5rem "}>
                            {
                                DataNumber.map((item, index) => {
                                    return (
                                        <Stack key={index} direction='row' gap={0}>
                                            <Badge variant='solid' colorScheme='green'>

                                                {item.Name}
                                            </Badge>
                                            <Badge color={"white"} variant='subtle' colorScheme='blue'>
                                                {item.Number}
                                            </Badge>
                                        </Stack>
                                    )

                                })
                            }


                        </Flex>

                        <Flex py="0.4rem" alignItems={"center"} gap="0.5rem" >
                            <Button _hover={
                                {
                                    transform: "scale(1.1)",
                                    transition: "0.4s"
                                }
                            } className=" Bg-Btn-Admin ">
                                Go to Black List
                            </Button>
                            <IconButton className="Btn-Nav" type="button" variant={"solid"}


                                _hover={
                                    {
                                        transform: "scale(1.1)"
                                    }
                                } icon={<FaUserPlus />} />
                            <IconButton className="Btn-Nav" type="button" variant={"solid"}


                                _hover={
                                    {
                                        transform: "scale(1.1)"
                                    }
                                } icon={<MdOutlineRefresh />} />
                            <IconButton className="Btn-Nav" type="button" variant={"solid"}


                                _hover={
                                    {
                                        transform: "scale(1.1)"
                                    }
                                } icon={<FaDownload />} />

                        </Flex>
                    </Flex>

                    <Table THeadData={THeadData} />
                </Box>
                {/* <AddUser /> */}

            </Box>
        </div >
    );
}

export default Users;
