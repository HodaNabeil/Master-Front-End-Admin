import { InputField, MultiSelect, PhoneInput, SelectField } from "@/Common";
import { Validation } from "@/Utility";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from "@chakra-ui/react";
import { useMemo } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
export default function CreateOrUpdate({
    OnClose = () => {},
    OnChange = () => {},
    OnSubmit = () => {},
    isLoading,
    Lang,
    State,
    Rtl
}) {
    const { City, Section } = useSelector((state) => state.Public);
    const SectionData = useMemo(() => {
        const AllSelected = Section.map((sec) => sec.SectionId);
        const Data = Lang?.DATA_PAGE?.TABS?.SECTIONS ? Lang?.DATA_PAGE?.TABS?.SECTIONS : [];
        return Data?.filter((sec) => AllSelected.includes(sec.value));
    }, [Lang?.DATA_PAGE?.TABS?.SECTIONS, Section]);
    const Cities = useMemo(() => {
        if (City.length > 0) {
            return City.reduce((prev, curr) => {
                const { CitySectionId, CityName, CityId } = curr || {};
                if (!prev[CitySectionId]) {
                    prev[CitySectionId] = [];
                }
                prev[CitySectionId].push({
                    CityId: CityId,
                    CityName: CityName,
                    CitySectionId: CitySectionId,
                    Icon: <FaCheck />
                });
                return prev;
            }, {});
        }
        return {};
    }, [City]);
    const Sections = useMemo(() => {
        return SectionData.map((section) => ({
            SectionName: section.ViewLabel,
            SectionKey: section.label,
            SectionId: section.value,
            Icon: <FaCheck />
        }));
    }, [SectionData]);

    const NextBtn = useMemo(() => {
        const DataToReturn = {
            IsDisabled: false,
            Bg: "green.600"
        };
        let errors = Validation.SubUser(State, State.IsEdit);
        errors = errors.map((err) => {
            if (err.includes(".")) {
                const Key = err.split(".")[1];
                const LangKey = Sections.find((x) => x.SectionKey == Key);
                return Lang?.VALIDATION?.SECTION_IS_EMPTY?.replaceAll(
                    "{{Key}}",
                    LangKey?.SectionName
                );
            }
            return Lang?.VALIDATION[err];
        });
        if (errors.length > 0) {
            DataToReturn.IsDisabled = true;
            DataToReturn.Bg = "red.700";
        }
        return {
            ...DataToReturn,
            Errors: errors
        };
    }, [Lang, Sections, State]);
    return (
        <Modal isOpen={State.IsOpen} onClose={OnClose}>
            <ModalOverlay />
            <ModalContent
                as={"form"}
                onSubmit={(e) => OnSubmit(e, State, State.IsEdit ? "Update" : "Create")}
                dir={Rtl ? "rtl" : "ltr"}
                className="Main-Modal"
            >
                <ModalHeader
                    py={1}
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    {State.IsEdit ? Lang?.UPDATE : Lang?.CREATE}
                    <ModalCloseButton pos={"inherit"} rounded={"full"} />
                </ModalHeader>
                <ModalBody>
                    <div>
                        {NextBtn.Errors?.map((Err, index) => (
                            <Text color="red.500" dir={Rtl ? "rtl" : "ltr"} key={index}>
                                ※ {Err}
                            </Text>
                        ))}
                    </div>
                    <InputField
                        Type="text"
                        Name="UserName"
                        Id={"UserName"}
                        Label={Lang?.AUTH_PAGE?.INPUTS?.USER_NAME}
                        placeholder={Lang?.AUTH_PAGE?.INPUTS?.USER_NAME}
                        Value={State.UserName}
                        OnChange={(e) => OnChange("UserName", e.target.value)}
                    />
                    <InputField
                        Type="email"
                        Name="UserEmail"
                        Id={"UserEmail"}
                        Label={Lang?.AUTH_PAGE?.INPUTS?.EMAIL}
                        placeholder={Lang?.AUTH_PAGE?.INPUTS?.EMAIL}
                        Value={State.UserEmail}
                        OnChange={(e) => OnChange("UserEmail", e.target.value)}
                    />
                    <SelectField
                        Name="UserJobTitle"
                        Id="UserJobTitle"
                        Label={Lang?.AUTH_PAGE?.INPUTS?.JOB_TITLE}
                        Options={Lang?.DASHBOARD_PAGE?.OPTIONS?.JOB_TITLE}
                        Value={State?.UserJobTitle}
                        OnChange={(e) => OnChange("UserJobTitle", e.target.value)}
                    />
                    <PhoneInput
                        Name="UserPhoneNumber"
                        Id="UserPhoneNumber"
                        Label={Lang?.AUTH_PAGE?.INPUTS?.PHONE_NUMBER}
                        Value={State.UserPhoneNumber}
                        OnChange={(e) => OnChange("UserPhoneNumber", e.target.value)}
                    />
                    <MultiSelect
                        key={`Selector_Section`}
                        Name={"UserSections"}
                        Type={"Section"}
                        InitialData={Sections}
                        Selected={State.UserSections}
                        OnChange={(e) => OnChange("UserSections", e.target.value)}
                        Label={Lang?.AUTH_PAGE?.INPUTS?.SECTION}
                        Rtl={Rtl}
                    />
                    {SectionData.map((Sec, index) => {
                        const CitySelectorName = Sec.label;
                        const IsSelectedSection = State.UserSections?.find(
                            (x) => x.SectionKey == CitySelectorName
                        );
                        return (
                            <MultiSelect
                                key={`CitySelector_${index}`}
                                Name={CitySelectorName}
                                Type={"City"}
                                InitialData={Cities[Sec.value]}
                                Selected={State[CitySelectorName]}
                                OnChange={(e) => OnChange(CitySelectorName, e.target.value)}
                                Label={Lang?.AUTH_PAGE?.INPUTS?.CITY?.replace(
                                    "{{Key}}",
                                    Sec.ViewLabel
                                )}
                                IsShow={IsSelectedSection ? true : false}
                                Rtl={Rtl}
                            />
                        );
                    })}
                    <InputField
                        Type="password"
                        Name="UserPassword"
                        Id={"UserPassword"}
                        Label={Lang?.AUTH_PAGE?.INPUTS?.PASSWORD}
                        placeholder={Lang?.AUTH_PAGE?.INPUTS?.PASSWORD}
                        Value={State.UserPassword}
                        OnChange={(e) => OnChange("UserPassword", e.target.value)}
                    />
                </ModalBody>
                <ModalFooter gap={2}>
                    <Button
                        colorScheme="blue"
                        onClick={OnClose}
                        w={"50%"}
                        _hover={{
                            bg: "blue.700",
                            color: "white"
                        }}
                        className="Shadow"
                        transition={".5s ease-in-out"}
                    >
                        {Lang?.CLOSE}
                    </Button>
                    <Button
                        type="submit"
                        w={"50%"}
                        colorScheme="green"
                        // _hover={{
                        //     bg: "green.700",
                        //     color: "white"
                        // }}
                        bg={NextBtn.Bg}
                        isLoading={isLoading}
                        _hover={{ backgroundColor: NextBtn.Bg }}
                        isDisabled={isLoading || NextBtn.IsDisabled}
                        transition={".5s ease-in-out"}
                    >
                        {Lang?.SUBMIT}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
