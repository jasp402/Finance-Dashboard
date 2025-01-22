import withReducer from 'app/store/withReducer';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { motion } from 'framer-motion';
import reducer from './store';
import { getWidgets, selectWidgets } from './store/widgetsSlice';
import FinanceDashboardAppHeader from './FinanceDashboardAppHeader';
import IncomeWidget from './widgets/IncomeWidget';
import ExpenseCategoriesWidget from './widgets/ExpenseCategoriesWidget';
import SavingsGoalWidget from './widgets/SavingsGoalWidget';

function FinanceDashboardApp() {
  const dispatch = useDispatch();
  const widgets = useSelector(selectWidgets);

  useEffect(() => {
    dispatch(getWidgets());
  }, [dispatch]);

  return (
    <FusePageSimple
      header={<FinanceDashboardAppHeader />}
      content={
        <div className="w-full px-24 md:px-32 pb-24">
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
                <motion.div className="w-full" variants={container} initial="hidden" animate="show">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-32 w-full mt-32">
                    <div className="grid gap-32 sm:grid-flow-col xl:grid-flow-row">
                      <motion.div variants={item} className="flex flex-col flex-auto">
                        <IncomeWidget />
                      </motion.div>

                      <motion.div variants={item} className="flex flex-col flex-auto">
                        <ExpenseCategoriesWidget />
                      </motion.div>
                    </div>
                    <motion.div variants={item} className="flex flex-col flex-auto">
                      <SavingsGoalWidget />
                    </motion.div>
                  </div>
                </motion.div>
              )
            );
          }, [widgets])}
        </div>
      }
    />
  );
}

export default withReducer('financeDashboardApp', reducer)(FinanceDashboardApp);
