import { observer } from 'mobx-react';
import React from 'react';

import { Loader } from '@/components/ui/Loader/Loader';
import { PageWrapper } from '@/components/ui/PageWrapper/PageWrapper';
import { Tabs } from '@/components/ui/Tabs/Tabs';
import { useStores } from '@/hooks';

import s from './App.module.scss';
import { Filter } from './components/Filter/Filter';
import { TicketsList } from './components/TicketsList/TicketsList';
import { tabs } from './defaults';

export const App = observer(() => {
  const { rootStore } = useStores();

  const { ticketsStore, errorsStore } = rootStore;

  const {
    filteredTickets,
    filters,
    setFilterType,
    setFilterStops,
    isPendingTickets,
  } = ticketsStore;
  const { errorMessage } = errorsStore;

  return (
    <PageWrapper>
      <div className={s.container}>
        <Filter
          className={s.filter}
          filters={filters.allStops}
          activeFilters={filters.activeStops}
          onChange={setFilterStops}
        />
        <div className={s.content}>
          <Tabs
            tabs={tabs}
            onSelect={setFilterType}
            activeTab={filters.sortType}
          />
          {isPendingTickets && (
            <div className={s.loader}>
              <Loader />
            </div>
          )}
          {errorMessage && <div className={s.errorMessage}>{errorMessage}</div>}
          {filteredTickets.length > 0 && (
            <TicketsList tickets={filteredTickets} />
          )}
        </div>
      </div>
    </PageWrapper>
  );
});
