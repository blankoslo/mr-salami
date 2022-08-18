import * as React from 'react';
import nb from 'date-fns/locale/nb';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import getWeek from 'date-fns/getWeek';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';
import { locale } from 'moment';
import { IWeek } from './WeekPicker';

type CustomPickerDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
};

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(isLastDay && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
})) as React.ComponentType<CustomPickerDayProps>;

export default function CustomDay({
    weekdays,
    setWeekdays,
    value,
    setValue
}: {
  weekdays: IWeek,
  setWeekdays: React.Dispatch<React.SetStateAction<IWeek>>
  value: Date | null,
  setValue: React.Dispatch<React.SetStateAction<Date | null>>
}) {
  // const [value, setValue] = React.useState<Date | null>(new Date());

  const renderWeekPickerDay = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>,
  ) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = startOfWeek(value, {locale: nb});
    const end = endOfWeek(value, {locale: nb});

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
      />
    );
  };

  function getDaysInWeek(day: Date){
    const firstDay = startOfWeek(day, {locale: nb})
    const lastDay = endOfWeek(day, {locale: nb})
    let days = []
    for (var d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days
  }

  return (
    <LocalizationProvider adapterLocale={nb} dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        disablePast
        displayStaticWrapperAs="desktop"
        label="Week picker"
        value={value}
        onChange={(newValue) => {
          if(newValue){
            setValue(newValue);
            setWeekdays({weeknumber: getWeek(newValue, {locale: nb}), days: getDaysInWeek(newValue)})
          }

        }}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} fullWidth/>}
        inputFormat="'Week of' MMM d"
      />
    </LocalizationProvider>
  );
}
