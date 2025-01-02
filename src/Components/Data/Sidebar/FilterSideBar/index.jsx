import { Box, Flex, Text, useBreakpoint, useColorMode, useDisclosure } from "@chakra-ui/react";
import { startTransition, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { HandelChangeFilter, Helper, InitialFilterResidential, ThemeColors } from "@/Utility";
import { CircleButton } from "@/Common";
import { useDispatch, useSelector } from "react-redux";
import { useLang, useNotify } from "@/Hooks";
import { ResetFilter, SetFilter, ToggleSideBar } from "@/Redux";
import SideBarData from "../SideBar";
import Finishing from "./Finishing";
import Bedrooms from "./Bedrooms";
import BuiltUpArea from "./BuiltUpArea";
import Cities from "./Cities";
import Compound from "./Compound";
import Delivery from "./Delivery";
import Developer from "./Developer";
import GroupType from "./GroupTypes";
import PaymenPlan from "./PaymenPlan";
import AdditionalFeatures from "./AdditionalFeatures";
import { MdVideoLabel } from "react-icons/md";
const NumbersCols = [
    "DataUnitTotalPriceFrom",
    "DataUnitTotalPriceTo",
    "DataBuiltUpAreaFrom",
    "DataBuiltUpAreaTo"
];
const ScrollDownCols = ["DataCompoundId", "DataDeveloperId", "BuiltUpArea"];
const FilterSideBar = ({
    SideBarApiData,
    NavHeight,
    MidProps = {},
    Rtl = true,
    OnResetAll = () => {},
    ...rest
}) => {
    const BreakPoint = useBreakpoint();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const Dispatch = useDispatch();
    const Lang = useLang();
    const Notify = useNotify();
    const MainSidebarRef = useRef();
    const { colorMode } = useColorMode();
    const [Tabs, SetTabs] = useState([]);
    const [State, SetState] = useReducer(HandelChangeFilter, InitialFilterResidential);
    // ===================         Filter         ================
    const { DataCityId, DataSectionId } = useSelector((state) => state.Filter);
    const { City, Section } = useSelector((state) => state.Public);
    const OldSelectedCity = Helper.GetStorage("City");
    const SectionsOptions = useMemo(() => {
        return Lang?.DATA_PAGE?.TABS?.SECTIONS?.length > 0 ? Lang?.DATA_PAGE?.TABS?.SECTIONS : [];
    }, [Lang?.DATA_PAGE?.TABS?.SECTIONS]);
    const OldSelectedSection = Helper.GetStorage("Section");
    const IsCommercial = useMemo(() => {
        return DataSectionId ? DataSectionId?.value == 2 : false;
    }, [DataSectionId]);
    const CityOptions = useMemo(() => {
        let Section = DataSectionId?.label;
        if (!DataSectionId && OldSelectedSection) {
            Section = OldSelectedSection?.label;
        }
        if (!Section) {
            Section = SectionsOptions[0]?.label;
        }
        return City?.length > 0
            ? City?.filter((C) => C.CitySection == Section)?.map((C) => ({
                  label: C.CityName,
                  value: C.CityId,
                  id: C.CityId
              }))
            : [];
    }, [City, DataSectionId, OldSelectedSection, SectionsOptions]);
    useEffect(() => {
        const AllSectionsOptions =
            Lang?.DATA_PAGE?.TABS?.SECTIONS?.length > 0 ? Lang?.DATA_PAGE?.TABS?.SECTIONS : [];
        const OldSelectedSection = Helper.GetStorage("Section");
        startTransition(() => {
            if (OldSelectedSection) {
                Dispatch(
                    SetFilter({
                        DataSectionId: OldSelectedSection
                    })
                );
            } else if (!OldSelectedSection && AllSectionsOptions.length > 0) {
                const NewSction = AllSectionsOptions[0];
                Dispatch(
                    SetFilter({
                        DataSectionId: NewSction
                    })
                );
                Helper.SetStorage("Section", NewSction);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Lang?.DATA_PAGE?.TABS?.SECTIONS?.length]);
    useEffect(() => {
        startTransition(() => {
            if (OldSelectedCity) {
                // HandleOldCity(OldSelectedCity, OldSelectedSection);
                Dispatch(
                    SetFilter({
                        DataCityId: OldSelectedCity
                    })
                );
            } else if (!OldSelectedCity && CityOptions.length > 0) {
                const NewCity = CityOptions[0];
                Dispatch(
                    SetFilter({
                        DataCityId: [NewCity]
                    })
                );
                Helper.SetStorage("City", [NewCity]);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CityOptions?.length]);
    const CityHelperOptions = useMemo(() => {
        const AllSelectedCitiesds = DataCityId?.filter((C) => C).map((C) => C.value) || [];
        const filteredCities = City?.filter(
            (c) => AllSelectedCitiesds.includes(c.CityId) && c.CitySectionId == DataSectionId?.value
        );
        const IsCommercialData = DataSectionId ? DataSectionId?.value == 2 : false;
        const Areas =
            filteredCities?.length != 0
                ? filteredCities.reduce((Obj, Item) => {
                      const { CityAreas, CityName, CityId } = Item || {};
                      Obj[CityName] = CityAreas?.map((area) => ({
                          label: area.AreaName,
                          value: area.AreaId,
                          id: area.AreaId,
                          CityId: CityId
                      }));
                      return Obj;
                  }, {})
                : [];
        return {
            Types: filteredCities.flatMap(
                (c) => c?.[IsCommercialData ? "CityTypesResidential" : "CityTypesResidential"]
            ),
            Areas: Areas
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [DataCityId, City?.length]);
    const HandleReset = (WithRest = true) => {
        if (WithRest) {
            Dispatch(
                ResetFilter({
                    DataCityId,
                    DataSectionId,
                    OrderBy: "DataUnitTotalPriceFrom",
                    Sort: "ASC"
                })
            );
        }
        SetState({
            type: "Reset"
        });
        SetTabs([]);
        OnResetAll();
    };
    const OnChange = (e) => {
        // Name = Key Of State , Ex : DataCityId Or DataAreaId
        const { Name, Value } = e || {};
        let NewData = Value;
        if (NumbersCols.includes(Name)) {
            const val = Value.replace(/\D/g, "");
            const limitedValue = val.slice(0, 9);
            let FloatNumber = Helper.ConvertToFloat(limitedValue);
            if (isNaN(FloatNumber) && val !== "") {
                Notify("info", "Numbers Only");
                return;
            }
            NewData = !isNaN(FloatNumber) ? FloatNumber : "";
        }
        if (ScrollDownCols.includes(Name) && MainSidebarRef?.current) {
            setTimeout(() => {
                MainSidebarRef.current.scrollTo({
                    top: MainSidebarRef.current.scrollHeight,
                    behavior: "smooth"
                });
            }, 100);
        }
        // """"""""""""" End Number""""""""""""
        const NewPayLoad = {
            [Name]: NewData
        };
        if (Name == "DataTypeId") {
            NewPayLoad["DataSubTypeId"] = [];
        }
        startTransition(() => {
            SetState({
                type: "Change",
                payload: NewPayLoad
            });
        });
    };
    const OnUnSelectItem = (Name, Value) => {
        const OldValues = State[Name];
        const NewValues = OldValues?.filter((x) => x?.value != Value?.value);
        startTransition(() => {
            SetState({
                type: "Change",
                payload: {
                    [Name]: NewValues
                }
            });
        });
    };
    // For Disptach To Redux Dirctly
    const OnDispatch = (e) => {
        const { Name, Value } = e || {};
        if (Name == "DataCityId") {
            HandleReset(false);
        }
        startTransition(() => {
            if (typeof Name == "object") {
                Dispatch(SetFilter(Name));
                return;
            }
            if (Name == "DataCityId") {
                if (!Value) return;
                Dispatch(
                    ResetFilter({
                        DataSectionId: DataSectionId,
                        DataCityId: [Value]
                    })
                );
                Helper.SetStorage("City", [Value]);
            }
        });
    };
    const OnToggleTab = (Tab) => {
        startTransition(() => {
            if (!Tab) {
                SetTabs([]);
                return;
            }
            SetTabs((prev) => {
                const IsSelected = prev.includes(Tab);
                return IsSelected ? prev?.filter((x) => x != Tab) : [Tab];
            });
        });
        ScrollDownCols.forEach((Col) => {
            if (Col.includes(Tab) && MainSidebarRef.current) {
                setTimeout(() => {
                    MainSidebarRef.current.scrollTo({
                        top: MainSidebarRef.current.scrollHeight,
                        behavior: "smooth"
                    });
                }, 100);
            }
        });
    };
    const StaticOptions = useMemo(() => {
        const CreateInstacnce = new SideBarData(Lang);
        return {
            Years: CreateInstacnce.Years(),
            DownPayment: CreateInstacnce.DownPayment(),
            BedRooms: CreateInstacnce.BedRooms(),
            Delivery: CreateInstacnce.Delivery(),
            Finishing: CreateInstacnce.Finishing(),
            ExtraBenefits: CreateInstacnce.ExtraBenefits()
        };
    }, [Lang]);
    const ApiOptions = useMemo(() => {
        return {
            Compound: SideBarApiData?.Compound
                ? [...SideBarApiData.Compound].sort((a, b) => a.label.localeCompare(b.label))
                : [],
            Developer: SideBarApiData?.Developer
                ? [...SideBarApiData.Developer].sort((a, b) => a.label.localeCompare(b.label))
                : [],
            Engineering: SideBarApiData?.Engineering
                ? [...SideBarApiData.Engineering].sort((a, b) => a.label.localeCompare(b.label))
                : [],
            Executive: SideBarApiData?.Executive
                ? [...SideBarApiData.Executive].sort((a, b) => a.label.localeCompare(b.label))
                : [],
            Management: SideBarApiData?.Management
                ? [...SideBarApiData.Management].sort((a, b) => a.label.localeCompare(b.label))
                : [],
            Architecture: SideBarApiData?.Architecture
                ? [...SideBarApiData.Architecture].sort((a, b) => a.label.localeCompare(b.label))
                : []
        };
    }, [SideBarApiData]);
    const PublicProps = {
        OnToggleTab,
        OnChange,
        colorMode,
        State,
        Lang,
        Tabs
    };
    // const Color = useColorModeValue(ThemeColors.MainColor?.light, ThemeColors.MainColor?.dark);
    const HandleSerch = (Form) => {
        // const DataToSend =
        let BaseBreakPoints = ["base", "sm"];
        startTransition(() => {
            Dispatch(SetFilter(Form));
            if (BaseBreakPoints.includes(BreakPoint)) {
                Dispatch(ToggleSideBar());
            }
        });
    };
    const OnSelectSection = (Sec) => {
        const IsInUserSections = Section.find((S) => S.SectionId == Sec.value);
        const IsSelected = DataSectionId?.value == Sec.value;
        const IsHaveCities = City.filter((C) => C.CitySectionId == Sec.value);
        if (IsInUserSections) {
            if (!IsHaveCities?.length > 0) {
                Notify("warn", Lang?.ERRORS?.NO_CITIES_FOUND);
                return;
            }
            if (IsSelected) return;
            SetState({
                type: "Reset"
            });
            let NewCity = {
                label: City[0].CityName,
                value: City[0].CityId,
                id: City[0].CityId
            };
            SetTabs([]);
            OnResetAll();
            Dispatch(
                ResetFilter({
                    DataSectionId: Sec,
                    DataCityId: [NewCity]
                })
            );
            Helper.SetStorage("Section", Sec);
            Helper.SetStorage("City", [NewCity]);
            return;
        }
        Notify("info", Lang?.ERRORS?.NOT_ALLOWED_SECTION?.replace("{{Key}}", Sec.ViewLabel));
    };
    const HEIGHT = {
        base: ``,
        sm: `${NavHeight.sm}vh`,
        md: `${NavHeight.md}vh`,
        lg: `${NavHeight.lg}vh`,
        xl: `${NavHeight.xl}vh`,
        "2xl": `${NavHeight["2xl"]}vh`
    };
    return (
        <Box
            id="Main-Sidebar"
            h={HEIGHT}
            pos={"relative"}
            w={"100%"}
            {...rest}
            dir={Rtl ? "rtl" : "ltr"}
        >
            {/* {window.innerHeight} */}
            <Flex
                h={"2.2rem"}
                className="flex_between"
                gap={{
                    sm: "10px",
                    md: ""
                }}
                px={2}
                fontSize="15px"
            >
                {SectionsOptions.map((Sec) => {
                    const IsSelected = DataSectionId?.value === Sec.value;
                    return (
                        <CircleButton
                            key={Sec.value}
                            Text={Sec.ViewLabel}
                            IsActive={IsSelected}
                            OnClick={() => OnSelectSection(Sec)}
                            w={"50%"}
                            py={"0.5"}
                            fontSize={"1rem"}
                        />
                    );
                })}
            </Flex>
            <Box
                top={"3rem"}
                ref={MainSidebarRef}
                h={{
                    base: `calc(${100 - NavHeight.base}vh - ${
                        window.innerHeight >= 671 ? 4.7 : 8
                    }rem)`,
                    sm: `calc(${100 - NavHeight.sm}vh - ${window.innerHeight >= 671 ? 5 : 8}rem)`,
                    md: `calc(${100 - NavHeight.md}vh - ${window.innerHeight >= 671 ? 5 : 8}rem)`,
                    lg: `calc(${100 - NavHeight.lg}vh - ${window.innerHeight >= 671 ? 5 : 8}rem)`,
                    xl: `calc(${100 - NavHeight.xl}vh - ${window.innerHeight >= 671 ? 5 : 8}rem)`,
                    "2xl": `calc(${100 - NavHeight["2xl"]}vh - ${
                        window.innerHeight >= 671 ? 5 : 8
                    }rem)`
                }}
                w={"100%"}
                overflowY={"auto"}
                overflowX={"hidden"}
                sx={{
                    "&::-webkit-scrollbar": {
                        width: "5px"
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#4b7a95", // scrollbar color
                        borderRadius: "10px", // optional: round edges
                        cursor: "pointer"
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f0f0f0" // scrollbar track color
                    }
                }}
                {...MidProps}
            >
                <Cities
                    OnDispatch={OnDispatch}
                    OnUnSelectItem={OnUnSelectItem}
                    Options={CityOptions}
                    SubOptions={CityHelperOptions.Areas || {}}
                    DataCityId={DataCityId}
                    {...PublicProps}
                />
                {/* """""""""""""""" Start  Group Typ  """""""""""""e */}
                <GroupType
                    Options={CityHelperOptions.Types || []}
                    OnUnSelectItem={OnUnSelectItem}
                    {...PublicProps}
                />
                {/* """""""""""""""" Start  Bedrooms   """""""""""""" */}
                <Bedrooms {...PublicProps} Options={StaticOptions.BedRooms} />
                {/* """"""""""""""""" Start  Finishing      """""""""""""" */}
                <Finishing {...PublicProps} Options={StaticOptions.Finishing} />

                {/* """"""""""""""""" Start  Delivery      """""""""""""" */}
                <Delivery {...PublicProps} Options={StaticOptions.Delivery} />
                {/* """"""""""""""""" Start  PaymenPlan      """""""""""""" */}
                <PaymenPlan
                    {...PublicProps}
                    SetState={SetState}
                    Options={{
                        Years: StaticOptions.Years,
                        DownPayment: StaticOptions.DownPayment
                    }}
                    Rtl={Rtl}
                />
                {/* """"""""""""""""""" BuiltUpArea =>>>>>>>>>>>>>Change Stylel Card user " */}

                <BuiltUpArea {...PublicProps} />

                {/* """"""""""""""""" Start  Compound      """""""""""""" */}

                <Compound
                    OnUnSelectItem={OnUnSelectItem}
                    {...PublicProps}
                    Options={ApiOptions.Compound}
                />

                {/* """"""""""""""""" Start  Developer  """""""""""""" */}
                <Developer
                    OnUnSelectItem={OnUnSelectItem}
                    {...PublicProps}
                    Options={ApiOptions.Developer}
                />

                {IsCommercial && (
                    <>
                        <Flex
                            alignItems="center"
                            gap={2}
                            onClick={() => (isOpen ? onClose() : onOpen())}
                            bg={ThemeColors.SidebarChooseOption[colorMode]}
                            p="0.3rem 0.6rem"
                            w="fit-content"
                            borderRadius="10px"
                            m="2rem 0.5rem 0 0.5rem"
                            cursor="pointer"
                            border="2px solid #7ea3ba"
                            pos={"relative"}
                        >
                            <Text>{Lang?.DATA_PAGE?.ADVANCED}</Text>
                            <MdVideoLabel />
                        </Flex>
                        <AdditionalFeatures
                            isOpen={isOpen}
                            onOpen={onOpen}
                            onClose={onClose}
                            Options={{
                                ExtraBenefits: StaticOptions.ExtraBenefits,
                                Engineering: ApiOptions.Engineering,
                                Executive: ApiOptions.Executive,
                                Management: ApiOptions.Management,
                                Architecture: ApiOptions.Architecture
                            }}
                            Rtl={Rtl}
                            SetMainState={SetState}
                            MainState={State}
                            OnUnSelectItem={OnUnSelectItem}
                        />
                    </>
                )}
            </Box>
            <Flex
                h={"2.2rem"}
                className="flex_between Main-Background-Bottom"
                w={"100%"}
                px={2}
                gap={2}
            >
                <CircleButton
                    Text="Clear"
                    OnClick={() => HandleReset(State)}
                    w={"50%"}
                    py={"0.5"}
                />
                <CircleButton
                    Text="search"
                    IsActive={true}
                    OnClick={() => HandleSerch(State)}
                    w={"50%"}
                    py={"0.5"}
                />
            </Flex>
        </Box>
    );
};

export default FilterSideBar;
