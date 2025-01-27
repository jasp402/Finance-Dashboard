import withReducer from 'app/store/withReducer';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import reducer from './store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import FinanceDashboardAppHeader from './FinanceDashboardAppHeader';
import PreviousStatementWidget from './widgets/PreviousStatementWidget';
import CurrentStatementWidget from './widgets/CurrentStatementWidget';
import AccountBalanceWidget from './widgets/AccountBalanceWidget';
import RecentTransactionsWidget from './widgets/RecentTransactionsWidget';
import BudgetWidget from './widgets/BudgetWidget';
import { fetchWidgetData, selectWidget } from './store/myWidgetSlice';

function FinanceDashboardApp() {
  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgets);
  const widgetsData = useSelector(selectWidget);

  useEffect(() => {
    dispatch(getWidgets());
    dispatch(fetchWidgetData());
  }, [dispatch]);

  return (
    <FusePageSimple
      header={<FinanceDashboardAppHeader />}
      content={
        <>
          {useMemo(() => {
            const container = {
              show: {
                transition: {
                  staggerChildren: 0.06,
                },
              },
            };
            const item = {
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            };

            return (
              !_.isEmpty(widgets) && (
                <motion.div
                  className="-full md:p-32 gap-32 p-24"
                  variants={container}
                  initial="hidden"
                  animate="show">
                   <motion.div variants={item} className='sm:col-span-2 lg:col-span-3'>
                      <AccountBalanceWidget />
                    </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full pt-24">
                  {/* Card 1 - Izquierda */}
                    <motion.div
                      variants={item}
                      className="flex flex-col flex-1 min-w-0" // Asegura que la card no se desborde
                    >
    {!_.isEmpty(widgetsData) && <PreviousStatementWidget />}
  </motion.div>

                    {/* Card 2 - Derecha */}
                    <motion.div
                      variants={item}
                      className="flex flex-col flex-1 min-w-0"
                    >
    <CurrentStatementWidget />
  </motion.div>
                    </div>
                  <div className='grid grid-cols-1 xl:grid-cols-3 gap-32 w-full mt-32'>
                    <motion.div variants={item} className='xl:col-span-2 flex flex-col flex-auto'>
                      <RecentTransactionsWidget />
                    </motion.div>
                    <motion.div variants={item} className='flex flex-col flex-auto'>
                      <BudgetWidget />
                    </motion.div>
                  </div>
                </motion.div>
              )
            );
          }, [widgets, widgetsData])}
        </>
      }
    />
  );
}

export default withReducer('financeDashboardApp', reducer)(FinanceDashboardApp);
