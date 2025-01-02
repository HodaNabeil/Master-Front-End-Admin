import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const useValidateSection = () => {
    const { DataSectionId, DataCityId } = useSelector((state) => state.Filter);
    const [initialData, setData] = useState({
        IsCommercial: false,
        IsResidential: false,
        SelectedCityId : null,
    });
    useMemo(() => {
        let r = DataSectionId?.label;
        if (r) {
            switch (r.trim()) {
                case "Commercial":
                    setData({
                        IsCommercial: true,
                        IsResidential: false,
                        SelectedCityId : DataCityId[0]?.value
                    });
                    break;
                case "Residential":
                    setData({
                        IsCommercial: false,
                        IsResidential: true,
                        SelectedCityId : DataCityId[0]?.value
                    });
                    break;
                default:
                    break;
            }
        }
    }, [DataCityId, DataSectionId?.label]);
    return initialData;
};
export default useValidateSection;
