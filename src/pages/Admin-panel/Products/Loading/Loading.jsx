import { Alert, Spin, Switch } from "antd";
import React from "react";
import { useState } from "react";
const Loading = () => {
    const [loading, setLoading] = useState(false);
    const toggle = (checked) => {
        setLoading(checked);
    };

    return (
        <div>
            <Spin spinning={loading}>
            <Alert
                message="Alert message title"
                description="Further details about the context of this alert."
                type="info"
            />
            </Spin>
            <div
                style={{
                    marginTop: 16,
                }}
            >
                Loading state:
                <Switch checked={loading} onChange={toggle} />
            </div>
        </div>
    );
};
export default Loading;