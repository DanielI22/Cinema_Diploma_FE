import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const HallSelect = ({ availableHalls, selectedHalls, handleHallChange }) => {
    const options = [...availableHalls, ...selectedHalls].map(hall => ({
        value: hall.id,
        label: hall.name
    }));

    const selectedValues = selectedHalls.map(hall => ({
        value: hall.id,
        label: hall.name
    }));

    const onChange = (selectedOptions) => {
        const updatedSelectedHalls = selectedOptions.map(option => ({
            id: option.value,
            name: option.label
        }));
        handleHallChange(updatedSelectedHalls);
    };

    return (
        <Select
            components={animatedComponents}
            isMulti
            onChange={onChange}
            options={options}
            value={selectedValues}
            classNamePrefix="react-select"
            noOptionsMessage={() => 'No available halls'}
        />
    );
};

export default HallSelect;