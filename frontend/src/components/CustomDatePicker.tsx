import { useState } from 'react';
import { TextField} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { CustomDatePickerProps } from 'types';

function CustomDatePicker({ onValueChanged } : CustomDatePickerProps) {
    const [value, setValue] = useState<Date | null>(
        new Date(),
      );
    
      const handleChange = (newValue: Date | null) => {
        setValue(newValue);
        onValueChanged(newValue);
      };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
            label="Date and time"
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>

    );
}

export default CustomDatePicker;
