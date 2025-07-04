import {
  IconBell,
  IconBuildingBank,
  IconCoin,
  IconCoins,
  IconExchange,
  IconFileTypeXls,
  IconHistoryToggle,
  IconPdf,
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
    type: "super",
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
            title: "ดาวน์โหลดหนังสือรับรองภาษี",
            path: "/manage-user/downloadtax",
            icon: <IconPdf />,
          },
          {
            title: "อัพ ทวิ 50 ขรก/ลูกจ้าง",
            path: "/manage-user/tax",
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
            title: "จัดการเงินเดือน",
            path: "/manage-salary/salary",
            icon: <IconPigMoney />,
          },
          {
            title: "อัพโหลดสลิป ขรก/ลูกจ้างประจำ",
            path: "/manage-salary/upload50",
            icon: <IconReceipt2 />,
          },
          {
            title: "อัพโหลดหนังสือรับรองภาษี ขรก/ลูกจ้างประจำ",
            path: "/manage-salary/upload-tax",
            icon: <IconReceiptTax />,
          },
     
          // {
          //   title: "จัดการใบภาษีของบุคลากร",
          //   path: "/manage-salary/customer-50",
          //   icon: <IconReceipt2 />,
          // },

          {
            title: "แก้ไขรายรับตามประเภท",
            path: "/manage-salary/add-revenue-fromtype",
            icon: <IconPlaylistAdd />,
          },
          {
            title: "แก้ไขรายจ่ายตามประเภท",
            path: "/manage-salary/add-expenses-fromtype",
            icon: <IconPlaylistAdd />,
          },
          {
            title: "นำเข้าและส่งออกข้อมูลเงินเดือน",
            path: "/manage-salary/import-export1715",
            icon: <IconReportMoney />,
          },
          {
            title: "นำเข้ารายจ่าย (พี่ฝน)",
            path: "/manage-salary/import-ex-fon",
            icon: <IconReportMoney />,
          },
          {
            title: "นำเข้ารายจ่ายบุคลากร",
            path: "/manage-salary/import-expend",
            icon: <IconExchange />,
          },
          {
            title: "ประวัติการนำเข้าข้อมูลเงินเดือน",
            path: "/manage-salary/import-history",
            icon: <IconHistoryToggle />,
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
            title: "จัดการประเภทงบประมาณ",
            path: "/manage-funda/budget",
            icon: <IconCoin />,
          },
          {
            title: "จัดการประเภทรายรับ",
            path: "/manage-funda/revenue",
            icon: <IconTrendingUp />,
          },
          {
            title: "จัดการประเภทรายจ่าย",
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
          {
            title: "รายการเงินเดือนผลรวม 0.1",
            path: "/report/report-salary01",
            icon: <IconReportMoney />,
            sub: [],
          },
          {
            title: "รายการเงินเดือนผลรวม 1.7 1.5",
            path: "/report/report-salary1715",
            icon: <IconReportMoney />,
            sub: [],
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
  {
    type: "plan",
    data: [
      {
        title: "รายงานและข้อมูลรายจ่าย",
        path: "/report-plan",
        icon: <IconReport />,
        sub: [],
      },
      {
        title: "รายงานและข้อมูลรายรับ",
        path: "/report-plan2",
        icon: <IconReport />,
        sub: [],
      },
      {
        title: "รายการเงินเดือนผลรวม 0.1",
        path: "/report/report-salary01",
        icon: <IconReportMoney />,
        sub: [],
      },
      // {
      //   title: "รายการเงินเดือนผลรวม 1.7 1.5",
      //   path: "/report/report-salary1715",
      //   icon: <IconReportMoney />,
      //   sub: [],
      // },
    ],
  },
  {
    type: "hr",
    data: [
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
        ],
      },
      {
        title: "จัดการเงินเดือน",
        path: "/manage-salary",
        icon: <IconCoins />,
        sub: [
          {
            title: "จัดการเงินเดือน",
            path: "/manage-salary/salary",
            icon: <IconPigMoney />,
          },
          {
            title: "อัพเดตข้อมูลเงินเดือน จากเดือนก่อนหน้า",
            path: "/manage-salary/update-salary",
            icon: <IconRefresh />,
          },
     
          {
            title: "นำเข้าและส่งออกข้อมูลเงินเดือนที่ปรับขึ้นใหม่",
            path: "/manage-salary/import-export1715",
            icon: <IconReportMoney />,
          },
          {
            title: "ประวัติการนำเข้าข้อมูลเงินเดือนที่ปรับขึ้นใหม่",
            path: "/manage-salary/import-history",
            icon: <IconHistoryToggle />,
          },
          {
            title: "แก้ไขรายรับตามประเภท",
            path: "/manage-salary/add-revenue-fromtype",
            icon: <IconPlaylistAdd />,
          },
        ],
      },
      {
        title: "จัดการข้อมูลพื้นฐาน",
        path: "/manage-funda",
        icon: <IconSettings />,
        sub: [
          {
            title: "จัดการประเภทงบประมาณ",
            path: "/manage-funda/budget",
            icon: <IconCoin />,
          },
          {
            title: "จัดการประเภทรายรับ",
            path: "/manage-funda/revenue",
            icon: <IconTrendingUp />,
          },
        ],
      },
    ],
  },
];
