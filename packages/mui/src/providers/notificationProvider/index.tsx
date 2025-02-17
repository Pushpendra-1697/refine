import React from "react";
import { NotificationProvider } from "@refinedev/core";

import { useSnackbar } from "notistack";

import { CircularDeterminate } from "@components";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import UndoOutlined from "@mui/icons-material/UndoOutlined";

export const useNotificationProvider = (): NotificationProvider => {
    const { closeSnackbar, enqueueSnackbar } = useSnackbar();

    const notificationProvider: NotificationProvider = {
        open: ({
            message,
            type,
            undoableTimeout,
            key,
            cancelMutation,
            description,
        }) => {
            if (type === "progress") {
                const action = (key: any) => (
                    <IconButton
                        onClick={() => {
                            cancelMutation?.();
                            closeSnackbar(key);
                        }}
                        color="inherit"
                    >
                        <UndoOutlined />
                    </IconButton>
                );
                enqueueSnackbar(
                    <>
                        <CircularDeterminate
                            undoableTimeout={undoableTimeout ?? 0}
                            message={message}
                        />
                    </>,
                    {
                        action,
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "right",
                        },
                        preventDuplicate: true,
                        key,
                        autoHideDuration: (undoableTimeout ?? 0) * 1000,
                        disableWindowBlurListener: true,
                    },
                );
            } else {
                enqueueSnackbar(
                    <Box>
                        <Typography variant="subtitle2" component="h6">
                            {description}
                        </Typography>
                        <Typography variant="caption" component="p">
                            {message}
                        </Typography>
                    </Box>,
                    {
                        key,
                        variant: type,
                        anchorOrigin: {
                            vertical: "top",
                            horizontal: "right",
                        },
                        disableWindowBlurListener: true,
                    },
                );
            }
        },
        close: (key) => {
            closeSnackbar(key);
        },
    };

    return notificationProvider;
};

/**
 * @deprecated `notificationProvider` is deprecated due to consistent naming convention between UI libraries. Please use `useNotificationProvider` export as your notification provider.
 */
export const notificationProvider = useNotificationProvider;
