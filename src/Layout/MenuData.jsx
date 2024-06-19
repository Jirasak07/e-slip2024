import {
  IconBadgeAr,
  IconBell,
  IconBuildingBank,
  IconCoin,
  IconCoins,
  IconFileTypeXls,
  IconPigMoney,
  IconPlaylistAdd,
  IconPrinter,
  IconReceipt2,
  IconReceiptTax,
  IconRefresh,
  IconReport,
  IconReportMedical,
  IconReportMoney,
  IconRotate2,
  IconSettings,
  IconTrendingDown,
  IconTrendingUp,
  IconUser,
  IconUserCog,
} from "@tabler/icons-react";

export const menus = [
  {
    type: "1",
    data: [
      // {
      //   title: "หน้าหลัก",
      //   path: "/main-page",
      //   icon: <IconHome />,
      //   sub: [],
      // },
      {
        title: "จัดการบุคลากร",
        path: "/manage-user",
        icon: <IconUserCog />,
        sub: [
          {
            title: "ข้อมูลบุคลากร",
            path: "/manage-user/user",
            icon: <IconUser />,
          },
          {
            title: "KTB Corporate Online",
            path: "/manage-user/ktb",
            icon: <IconBuildingBank />,
          },
        ],
      },
      {
        title: "จัดการเงินเดือน",
        path: "/manage-salary",
        icon: <IconCoins />,
        sub: [
          {
            title: "อัพโหลดหนังสือรับรองภาษี",
            path: "/manage-salary/upload-tax",
            icon: <IconReceiptTax />,
          },
          {
            title: "อัพโหลดสลิป",
            path: "/manage-salary/upload50",
            icon: <IconReceipt2 />,
          },
          // {
          //   title: "จัดการใบภาษีของบุคลากร",
          //   path: "/manage-salary/customer-50",
          //   icon: <IconReceipt2 />,
          // },
          {
            title: "จัดการเงินเดือน",
            path: "/manage-salary/salary",
            icon: <IconPigMoney />,
          },
          {
            title: "เพิ่มรายรับตามประเภท",
            path: "/manage-salary/add-revenue-fromtype",
            icon: <IconPlaylistAdd />,
          },
          {
            title: "เพิ่มรายจ่ายตามประเภท",
            path: "/manage-salary/add-expenses-fromtype",
            icon: <IconPlaylistAdd />,
          },
          {
            title: "นำเข้าและส่งออกข้อมูลเงินเดือน",
            path: "/manage-salary/import-export1715",
            icon: <IconReportMoney />,
          },
          // {
          //   title: "อัพเดตข้อมูลรายจ่ายเดือนก่อนหน้า",
          //   path: "/manage-salary/update-revenue",
          //   icon: <IconRotateClockwise2 />,
          // },
          {
            title: "อัพเดตข้อมูลรายรับ/รายจ่ายจากเดือนก่อนหน้า",
            path: "/manage-salary/update-expenses",
            icon: <IconRotate2 />,
          },
          {
            title: "อัพเดตข้อมูลเงินเดือน จากเดือนก่อนหน้า",
            path: "/manage-salary/update-salary",
            icon: <IconRefresh />,
          },
        ],
      },
      {
        title: "จัดการข้อมูลพื้นฐาน",
        path: "/manage-funda",
        icon: <IconSettings />,
        sub: [
          {
            title: "จัดการงบประมาณ",
            path: "/manage-funda/budget",
            icon: <IconCoin />,
          },
          {
            title: "จัดการรายรับ",
            path: "/manage-funda/revenue",
            icon: <IconTrendingUp />,
          },
          {
            title: "จัดการรายจ่าย",
            path: "/manage-funda/expenses",
            icon: <IconTrendingDown />,
          },
        ],
      },

      {
        title: "รายงานและข้อมูล",
        path: "/report",
        icon: <IconReport />,
        sub: [
          {
            title: "รายงานรายจ่ายแยกประเภท",
            path: "/report/expenditure-type",
            icon: <IconTrendingDown />,
          },
          {
            title: "รายงานรายรับแยกประเภท",
            path: "/report/revenue-type",
            icon: <IconTrendingUp />,
          },
          {
            title: "รายงาน IPAY",
            path: "/report/ipay",
            icon: <IconFileTypeXls />,
          },
          {
            title: "แสดงรายการเงินเดือน",
            path: "/report/salary",
            icon: <IconPigMoney />,
          },
          {
            title: "ประวัติการพิมพ์",
            path: "/report/print-history",
            icon: <IconPrinter />,
          },
          {
            title: "การแจ้งเตือน",
            path: "/report/notifications",
            icon: <IconBell />,
          },
          {
            title: "รายงานลดหย่อนภาษี",
            path: "/report/tax",
            icon: <IconReceiptTax />,
          },
          // {
          //   title: "วิธีการแยกไฟล์ PDF",
          //   path: "/report/pdf",
          //   icon: <IconFileTypePdf />,
          // },
        ],
      },
    ],
  },
  {
    type: "2",
    data: [
      {
        title: "รายการเงินเดือน",
        path: "/user-salary",
        icon: <IconReportMoney />,
        sub: [],
      },
      {
        title: "แบบฟอร์มแจ้งรับเงิน",
        path: "/form-receive-money",
        icon: <IconReportMedical />,
        sub: [],
      },
    ],
  },
];
