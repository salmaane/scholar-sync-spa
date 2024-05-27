import { useState, useEffect } from "react";
import { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

type configObj = {
    method : 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: string,
    requestConfig: AxiosRequestConfig,
    handleResponse: (data: any) => void;
    handleError: (error: any) => void;
}

const useAxiosFunction = (axiosInstance : AxiosInstance) => {
    const [data, setData] = useState<any | null>();
    const [error, setError] = useState<AxiosError>();
    const [loading, setLoading] = useState<boolean>(false);
    const [controller, setController] = useState<AbortController>();

    const axiosFetch = ({ method, url, requestConfig, handleResponse, handleError } : configObj) => {
        setLoading(true);
        const ctrl = new AbortController();
        setController(ctrl);
        
        axiosInstance[method](url, {...requestConfig, signal: ctrl.signal})
        .then(response => {
            setData(response.data);
            handleResponse?.(response.data);
        })
        .catch(err => {
            setError(err);
            handleError?.(err);
        })
        .finally(()  => {
            setLoading(false);
        })
    }

    useEffect(() => {
        return () => controller?.abort();
    }, [controller]);

    return [data, error, loading, axiosFetch];
}

export default useAxiosFunction