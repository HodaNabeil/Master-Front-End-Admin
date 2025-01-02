import { Box, useDisclosure } from "@chakra-ui/react";
import { CustomMultiCheckBox, Label } from "@/Common";
import TypeFilter from "../TypeFilter";
import { useMemo } from "react";
import FilterResultMap from "../../FilterResultMap";
export default function GroupType({
    Options = [],
    State,
    OnChange,
    Tabs,
    OnToggleTab,
    Lang,
    OnUnSelectItem = () => {}
}) {
    const { isOpen, onToggle } = useDisclosure();
    const Result = useMemo(() => {
        let result = [];
        if (State.DataTypeId?.label) {
            result.push({
                Label: "",
                Value: State.DataTypeId?.label,
            });
        }
        return result;
    }, [State.DataTypeId]);
    const SubResult = useMemo(() => {
        let result = [];
        if (State.DataSubTypeId?.length > 0) {
            State.DataSubTypeId.forEach((Item) => {
                result.push({
                    Label: "",
                    Value: Item.label,
                    OnClick: () => OnUnSelectItem("DataSubTypeId", Item)
                });
            });
        }
        return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [State.DataSubTypeId]);
    return (
        <Box pt={"10px"}>
            <TypeFilter
                text={Lang?.SIDEBAR?.LABEL?.TYPES}
                onToggle={onToggle}
                isOpen={isOpen}
                Name={"Type"}
                Tabs={Tabs}
                OnToggleTab={OnToggleTab}
            />
            {isOpen &&
                Options.map((type) => {
                    const IsSelected = State.DataTypeId.id == type.TypeId;
                    const Item = {
                        label: type.TypeName,
                        id: type.TypeId,
                        value: type.TypeId
                    };
                    const AreaOptions = IsSelected
                        ? type.TypeSubTypes?.map((sub) => ({
                              label: sub.SubTypeName,
                              value: sub.SubTypeId,
                              id: sub.SubTypeId,
                              type: type.TypeId
                          }))
                        : [];
                    return (
                        <Box key={`CityTypes_${type.TypeId}`} id={`CityTypes_${type.TypeId}`}>
                            <Label
                                Item={Item}
                                HandleOnClick={OnChange}
                                IsSelected={IsSelected}
                                AllowToggle={true}
                                Name={"DataTypeId"}
                            >
                                {IsSelected && (
                                    <CustomMultiCheckBox
                                        Name={"DataSubTypeId"}
                                        Value={State.DataSubTypeId}
                                        Options={AreaOptions}
                                        IsMulti={true}
                                        OnChange={(e) => OnChange(e)}
                                        Lang={Lang}
                                    />
                                )}
                            </Label>
                        </Box>
                    );
                })}
            {(State.DataTypeId.label || State.DataSubTypeId?.length > 0) && (
                <FilterResultMap
                    Result={Result}
                    SubResult={SubResult}
                    Target="Value"
                    SubTarget="Value"
                />
            )}
        </Box>
    );
}
