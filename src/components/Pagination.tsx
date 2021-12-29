import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../styles/colors';

import { Button } from './Button';

type PaginationProps = {
  currentPage: number;
  totalRecords: number;
  perPage: number;
  onChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalRecords,
  perPage,
  onChange,
}) => {
  const [currentPage_, setCurrentPage] = useState<number>(0);

  const _handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      onChange(page);
    },
    [onChange],
  );

  useEffect(() => {
    if (!totalRecords) {
      return;
    }
    /**
     * reasons for this check
     * 1: fix page number i.e. if users passes 0 or -1, then we need to reset page to 1
     * 2: if user passes 1, we still need to trigger onChange event as user might add a function
     * on page change so it should trigger first time as well.
     * P.S maybe there's a better logic, will rethink
     */
    if (currentPage < 2) {
      _handlePageChange(1);
    }
  }, [currentPage, totalRecords, _handlePageChange]);

  return (
    <>
      {totalRecords ? (
        <View style={styles.container}>
          <Button
            title="Prev"
            kind="secondary"
            onPress={() => {
              const newPage = currentPage_ - 1;
              _handlePageChange(newPage);
            }}
            disabled={currentPage_ === 1}
          />
          <Text style={{ color: colors.primary }}>
            Page: {currentPage_} of {Math.ceil(totalRecords / perPage)}
          </Text>
          <Button
            title="Next"
            kind="secondary"
            onPress={() => {
              const newPage = currentPage_ + 1;
              _handlePageChange(newPage);
            }}
            disabled={currentPage_ === Math.ceil(totalRecords / perPage)}
          />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
