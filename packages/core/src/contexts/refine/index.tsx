import React from "react";
import pluralize from "pluralize";
import { humanizeString } from "../../definitions/helpers/humanizeString";

import {
    IRefineContextOptions,
    IRefineContext,
    IRefineContextProvider,
} from "./IRefineContext";
import { DefaultLayout } from "@components/layoutWrapper/defaultLayout";

import { LoginPage as DefaultLoginPage } from "@components/pages";

export const defaultRefineOptions: IRefineContextOptions = {
    mutationMode: "pessimistic",
    syncWithLocation: false,
    undoableTimeout: 5000,
    warnWhenUnsavedChanges: false,
    liveMode: "off",
    redirect: {
        afterCreate: "list",
        afterClone: "list",
        afterEdit: "list",
    },
    overtime: {
        interval: 1000,
    },
    textTransformers: {
        humanize: humanizeString,
        plural: pluralize.plural,
        singular: pluralize.singular,
    },
    disableServerSideValidation: false,
};

export const RefineContext = React.createContext<IRefineContext>({
    hasDashboard: false,
    mutationMode: "pessimistic",
    warnWhenUnsavedChanges: false,
    syncWithLocation: false,
    undoableTimeout: 5000,
    Title: undefined,
    Sider: undefined,
    Header: undefined,
    Footer: undefined,
    Layout: DefaultLayout,
    OffLayoutArea: undefined,
    liveMode: "off",
    onLiveEvent: undefined,
    options: defaultRefineOptions,
});

export const RefineContextProvider: React.FC<IRefineContextProvider> = ({
    hasDashboard,
    mutationMode,
    warnWhenUnsavedChanges,
    syncWithLocation,
    undoableTimeout,
    children,
    DashboardPage,
    Title,
    Layout = DefaultLayout,
    Header,
    Sider,
    Footer,
    OffLayoutArea,
    LoginPage = DefaultLoginPage,
    catchAll,
    liveMode = "off",
    onLiveEvent,
    options,
}) => {
    return (
        <RefineContext.Provider
            value={{
                __initialized: true,
                hasDashboard,
                mutationMode,
                warnWhenUnsavedChanges,
                syncWithLocation,
                Title,
                undoableTimeout,
                Layout,
                Header,
                Sider,
                Footer,
                OffLayoutArea,
                DashboardPage,
                LoginPage,
                catchAll,
                liveMode,
                onLiveEvent,
                options,
            }}
        >
            {children}
        </RefineContext.Provider>
    );
};
