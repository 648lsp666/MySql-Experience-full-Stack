
import React from "react";
import {Drawer,Button} from "antd";

function GradeCard({open,close}) {



return (
    <Drawer open={open} onClose={close} title="成绩单修改" placement="right">

        <Button
        type="primary"
        >保存修改</Button>
        <Button
        type="primary"                    
        >取消修改</Button>

    </Drawer>    
);
}
export default GradeCard;