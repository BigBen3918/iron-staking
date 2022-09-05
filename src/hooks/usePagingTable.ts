import { useCallback, useEffect, useState } from 'react';

const usePagingTable = <T>(getData: (skip: number, take: number) => Promise<T>, take = 10) => {
  const [skip, setSkip] = useState(0);
  const [data, setData] = useState([]);
  const [isEndOfList, setIsEndOfList] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getData(skip, take)
      .then((response: any) => {
        if (response) {
          const isExitsCountResponse = response?.count != null;
          setData(isExitsCountResponse ? response?.items : response);
          if (isExitsCountResponse) {
            setIsEndOfList(response?.count <= take || skip + take >= response?.count);
          } else {
            setIsEndOfList(response.length < take ? true : false);
          }
        }
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [skip, take, getData]);

  const next = useCallback(() => {
    setSkip((s) => s + take);
  }, [take]);

  const previous = useCallback(() => {
    setSkip((s) => s - take);
  }, [take]);

  return { skip, setSkip, data, next, previous, isLoading, isEndOfList };
};

export default usePagingTable;
