import React from "react";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import { Checkbox } from "antd";
import AxiosClient from "../../../../utils/axiosClient";
const CheckboxGroup = Checkbox.Group;
function CheckBoxComponent({
  apiUrl,
  params,
  onChange,
  onCheckAllChange,
  disabled,
  fieldShow = "name",
  fieldShow1 = "",
  defaultValue,
}: {
  apiUrl: string;
  params?: any;
  onChange?: (id: any) => void;
  onCheckAllChange?: (id: any) => void;
  disabled?: boolean;
  fieldShow?: string;
  fieldShow1?: string;
  defaultValue?: any;
}) {
  const defaultCheckedList: [] = [];
  const [checkedList, setCheckedList] =
    React.useState<CheckboxValueType[]>(defaultCheckedList);

  const [defaultOption, setDefaultOption] = React.useState<any>([]);

  const fetchUserList = React.useCallback(
    async (search?: string) => {
      return AxiosClient(`${apiUrl}`, {
        params: { ...params, search, limit: 15 },
      }).then((body) =>
        body?.data?.map((data: any) => ({
          label: fieldShow1
            ? `${data[fieldShow]}-${data[fieldShow1]}`
            : `${data[fieldShow] || "-"}`,
          value: data?.id,
        }))
      );
    },
    [apiUrl, params, fieldShow, disabled]
  );
  React.useEffect(() => {
    fetchUserList().then((res) => {
      return setDefaultOption(res);
    });
  }, [disabled, params, apiUrl]);

  return (
    <CheckboxGroup
      style={{ display: "flex", flexDirection: "column" }}
      options={defaultOption}
      // defaultValue={defaultValue}
      value={checkedList || []}
      onChange={(list: CheckboxValueType[]) => {
        setCheckedList(list);
        onChange && onChange(list || undefined);
      }}
    />
  );
}

export default CheckBoxComponent;
