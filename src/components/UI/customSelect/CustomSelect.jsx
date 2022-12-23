import React from "react";
import Select, {components} from "react-select";
import SelectIcon from "../../../assets/icons/select/Select";

const CustomSelect = ({
                          options = [],
                          backgroundColor = "transparent",
                          fontFamily = '"Poppins-Medium", sans-serif',
                          fontWeight = "500",
                          fontSize = "1.6rem",
                          lineHeight = "2rem",
                          color = "#415572",
                          handleValue,
                          iconBackground
                      }) => {

    const DropdownIndicator = (props) => {
        return (
            <components.DropdownIndicator {...props}>
                <SelectIcon iconBackground={iconBackground}/>
            </components.DropdownIndicator>
        );
    };
    const NoOptionsMessage = (props) => {
        return (
            <components.NoOptionsMessage {...props}>
                So‘rovga mos natijalar topilmadi
            </components.NoOptionsMessage>
        );
    };
    return (
        <Select
            defaultValue={options[0]}
            placeholder="Bo‘limi tanlang"
            options={options}
            components={{
                NoOptionsMessage,
                DropdownIndicator,
                IndicatorSeparator: () => null,
            }}
            onChange={({value}) => handleValue(value)}
            styles={{
                control: (base) => ({
                    ...base,
                    backgroundColor: backgroundColor,
                    border: 0,
                    padding: "1.2rem 1.2rem 1.2rem 2.1rem",
                    borderRadius: "323.2rem",
                    boxShadow: "none",
                    fontFamily: fontFamily,
                    fontStyle: "normal",
                    fontWeight: fontWeight,
                    fontSize: fontSize,
                    lineHeight: lineHeight,
                    cursor: "pointer",
                }),
                valueContainer: (base) => ({
                    ...base,
                    padding: 0,
                }),
                singleValue: (base) => ({
                    ...base,
                    margin: 0,
                    padding: 0,
                    color: color,
                }),
                input: (base) => ({
                    ...base,
                    margin: 0,
                    padding: 0,
                }),
                indicatorsContainer: (base) => ({
                    ...base,
                    marginLeft: "1.2rem",
                }),
                dropdownIndicator: (base, state) => ({
                    ...base,
                    padding: 0,
                    transition: "all .3s ease-out",
                    transform: state.selectProps.menuIsOpen
                        ? "rotate(-180deg)"
                        : null,
                }),
                menu: (base) => ({
                    ...base,
                    margin: 0,
                    top: "calc(100% + .2rem)",
                    left: "2rem",
                    background: "#FFFFFF",
                    borderRadius: "1.2rem",
                    overflow: "hidden",
                    minWidth: "calc(100% - 2rem)",
                    width: "auto",
                    boxShadow: "rgba(149, 157, 165, 0.2) 0 .8rem 2.4rem",
                }),
                menuList: (base, state) => ({
                    ...base,
                    padding: state.children?.length > 0 ? "1.6rem 0" : "0",
                    margin: 0
                }),
                option: (base, state) => ({
                    ...base,
                    padding: ".4rem 1.6rem",
                    fontFamily: '"SourceSansPro", sans-serif',
                    fontStyle: "normal",
                    fonWeight: "400",
                    fontSize: "1.6rem",
                    lineHeight: "2.5rem",
                    whiteSpace: "nowrap",
                    color:
                        state.isSelected || state.isFocused
                            ? "white"
                            : "#14161A",
                    backgroundColor: state.isSelected || state.isFocused
                        ? "#0173FF"
                        : "transparent",
                    cursor: "pointer",
                }),
                noOptionsMessage: (base) => ({
                    ...base,
                    padding: ".8rem 1.6rem",
                    fontFamily: '"SourceSansPro", sans-serif',
                    fontStyle: "normal",
                    fonWeight: "400",
                    fontSize: "1.6rem",
                    lineHeight: "2.5rem",
                    cursor: "not-allowed",
                    whiteSpace: "nowrap",
                }),
            }}
        />
    );
};

export default CustomSelect;
