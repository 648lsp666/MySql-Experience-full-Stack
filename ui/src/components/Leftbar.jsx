import React, { Fragment, useState } from "react";
import "./css/leftbar.css";
import { BarButton } from "./barbutton";
import {
  AppstoreOutlined,
  CalculatorOutlined,
  BookOutlined,
  MenuOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

function Leftbar() {
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem(
      <BarButton
        id="studentmanager"
        params={{
          path: "/student",
          name: "学生管理",
        }}
      />,
      "sub1",
      <UserAddOutlined />,
      []
    ),
    getItem(
      <BarButton
        id="coursemanager"
        params={{
          path: "/course",
          name: "课程管理",
        }}
      />,
      "sub2",
      <MenuOutlined />,
      []
    ),
    getItem(
      <BarButton
        id="coursemanager"
        params={{
          path: "/S-C",
          name: "分数管理",
        }}
      />,
      "sub3",
      <AppstoreOutlined />,
      [
        getItem(
          <BarButton
            id="coursemanager"
            params={{
              path: `/S-C/Cno/${1}`,
              name: "按课程查询",
            }}
          />,
          "sub4",
          <BookOutlined />,
          null
        ),
        getItem(
          <BarButton
            id="coursemanager"
            params={{
              path: `/S-C/Sdept/${"CS"}`,
              name: "按系别查询",
            }}
          />,
          "sub5",
          <CalculatorOutlined />,
          null
        ),
      ]
    ),
  ];

  // 根据路由匹配情况设置菜单的选中状态
  return (
    <Menu
      mode="inline"
      style={{
        width: "200px",
        padding: "10px",
      }}
      items={items}// 设置默认展开的菜单
    >

      {/* 其他菜单项 */}
    </Menu>
  );
}

export default Leftbar;
