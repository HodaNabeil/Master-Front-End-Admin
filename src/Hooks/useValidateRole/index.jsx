import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const useValidateRole = () => {
    const { UserRole } = useSelector((state) => state.Auth);
    const [initialData, setData] = useState({
        IsPersonal: false,
        IsCompany: false,
        IsSubUser: false
    });
    useMemo(() => {
        let r = UserRole?.RoleKey;
        if (r) {
            r = r.trim();
            switch (r.trim()) {
                case "Company":
                    setData({
                        IsPersonal: false,
                        IsCompany: true,
                        IsSubUser: false
                    });
                    break;
                case "Personal":
                    setData({
                        IsPersonal: true,
                        IsCompany: false,
                        IsSubUser: false
                    });
                    break;
                case "SubUser":
                    setData({
                        IsPersonal: false,
                        IsCompany: false,
                        IsSubUser: true
                    });
                    break;
                default:
                    break;
            }
        }
    }, [UserRole?.RoleKey]);
    return initialData;
};
export default useValidateRole;
