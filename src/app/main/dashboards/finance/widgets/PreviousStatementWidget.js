import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import { selectWidgets } from '../store/widgetsSlice';
import { selectWidget } from '../store/myWidgetSlice';

function formatCustomDateTime(dateStr, timeStr) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Combinar fecha y hora en un objeto Date
  const [year, month, day] = dateStr.split('-');
  const [hours, minutes] = timeStr.split(':');
  const date = new Date(year, month - 1, day, hours, minutes);

  // Formatear componentes
  const monthName = months[date.getMonth()];
  const formattedDay = date.getDate();
  const formattedYear = date.getFullYear();

  // Formatear hora en formato 12h con AM/PM
  let formattedHours = date.getHours() % 12 || 12;
  const amPm = date.getHours() >= 12 ? 'PM' : 'AM';
  const formattedMinutes = date.getMinutes().toString().padStart(2, '0');

  return `${monthName} ${formattedDay}, ${formattedYear} - ${formattedHours}:${formattedMinutes} ${amPm}`;
}

function PreviousStatementWidget() {
  const widgets = useSelector(selectWidgets);
  const widgetsData = useSelector(selectWidget);
  // const { status, date, limit, spent, minimum } = widgets?.previousStatement;

  console.log(widgetsData);

  if (!widgetsData?.annualFinancialSummary) {
    return <div className="p-24 text-red-500">Cargando datos financieros...</div>;
  }

  const {
          status = 'pending',
          date = '',
          hour = 0,
          incomes = { PEN: 0, USD: 0 },
          expenses = { PEN: 0, USD: 0 }
        } = widgetsData?.annualFinancialSummary;

  return (
    <Paper className="relative flex flex-col flex-auto p-24 pr-12 pb-12 rounded-2xl shadow overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <Typography className="text-lg font-medium tracking-tight leading-6 truncate">
            Total de operaciones anuales
          </Typography>
          {status === 'paid' && (
            <Typography className="text-green-600 font-medium text-sm">Ultima operación {formatCustomDateTime(date, hour)}</Typography>
          )}
          {status === 'pending' && (
            <Typography className="text-red-600 font-medium text-sm">
              Must be paid before {date}
            </Typography>
          )}
        </div>
        <div className="-mt-8">
          <IconButton aria-label="more" size="large">
            <FuseSvgIcon>heroicons-outline:dots-vertical</FuseSvgIcon>
          </IconButton>
        </div>
      </div>

      <div className='flex flex-row gap-x-24 mt-16'>
        {/* Columna de Ingresos */}
        <div className='flex flex-col gap-y-24 flex-1'>
      <div className='flex flex-col'>
        <Typography color='text.secondary' className='text-sm font-medium leading-none'>
          Ingresos PEN
        </Typography>
        <Typography className='mt-8 font-medium text-3xl leading-none flex items-center gap-2'>
          {Number(incomes?.PEN?.amount).toLocaleString('es-PE', {
            style   : 'currency',
            currency: 'PEN',
          })}
          <FuseSvgIcon className='text-green-500' size={20}>heroicons-solid:trending-up</FuseSvgIcon>
          <Typography className='text-md font-medium text-green-500'>{Number(incomes?.PEN?.trx)}</Typography>
          <Typography className="text-13" color="text.secondary">TRX.</Typography>
        </Typography>
      </div>
      <div className='flex flex-col'>
        <Typography color='text.secondary' className='text-sm font-medium leading-none'>
          Ingresos USD
        </Typography>
        <Typography className='mt-8 font-medium text-3xl leading-none flex items-center gap-2'>
          {Number(incomes?.USD?.amount).toLocaleString('en-EN', {
            style   : 'currency',
            currency: 'USD',
          })}
          <FuseSvgIcon className='text-green-500' size={20}>heroicons-solid:trending-up</FuseSvgIcon>
          <Typography className='text-md font-medium text-green-500'>{Number(incomes?.USD?.trx)}</Typography>
          <Typography className="text-13" color="text.secondary">TRX.</Typography>
        </Typography>
      </div>
    </div>

        {/* Columna de Gastos */}
        <div className='flex flex-col gap-y-24 flex-1'>
      <div className='flex flex-col'>
        <Typography color='text.secondary' className='text-sm font-medium leading-none'>
          Gastos PEN
        </Typography>
        <Typography className='mt-8 font-medium text-3xl leading-none  flex items-center gap-2'>
          {Number(expenses?.PEN?.amount).toLocaleString('es-PE', {
            style   : 'currency',
            currency: 'PEN',
          })}
          <FuseSvgIcon className='text-red-500' size={20}>heroicons-solid:trending-down</FuseSvgIcon>
          <Typography className='text-md font-medium text-red-500'>{Number(expenses?.PEN?.trx)}</Typography>
          <Typography className="text-13" color="text.secondary">TRX.</Typography>
        </Typography>
      </div>
      <div className='flex flex-col'>
        <Typography color='text.secondary' className='text-sm font-medium leading-none'>
          Gastos USD
        </Typography>
        <Typography className='mt-8 font-medium text-3xl leading-none flex items-center gap-2'>
          {Number(expenses?.USD?.amount).toLocaleString('en-US', {
            style   : 'currency',
            currency: 'USD',
          })}
          <FuseSvgIcon className='text-red-500' size={20}>heroicons-solid:trending-down</FuseSvgIcon>
          <Typography className='text-md font-medium text-red-500'>{Number(expenses?.USD?.trx)}</Typography>
          <Typography className="text-13" color="text.secondary">TRX.</Typography>
        </Typography>
      </div>
    </div>
      </div>

      <div className='absolute bottom-0 ltr:right-0 rtl:left-0 w-96 h-96 -m-24'>
        {status === 'paid' && (
          <FuseSvgIcon size={96} className='opacity-25 text-green-500 dark:text-green-400'>
            heroicons-outline:check-circle
          </FuseSvgIcon>
        )}

        {status === 'pending' && (
          <FuseSvgIcon size={96} className='opacity-25 text-red-500 dark:text-red-400'>
            heroicons-outline:exclamation-circle
          </FuseSvgIcon>
        )}
      </div>
    </Paper>
  );
}

export default memo(PreviousStatementWidget);
