import React, {useState} from "react";
import {Badge} from "./Badge";

type Props = {
  url: string
}

export const Print = (props: Props) => {
  const {url} = props
  const [running, setRunning] = useState(false)
  const onPrint = () => {
    setRunning(true)
    const iframe = document.createElement("iframe");

    function closePrint() {
      document.body.removeChild(iframe);
      setRunning(false)
    }

    function setPrint() {
      if (iframe.contentWindow) {
        iframe.contentWindow.onbeforeunload = closePrint;
        iframe.contentWindow.onafterprint = closePrint;
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      }
    }

    iframe.onload = setPrint;
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.src = url;
    document.body.appendChild(iframe);
  }

  return (
    <Badge left={'🖨️ 打印'}
           tooltip={'打印/保存为PDF'}
           onLeftClick={onPrint}
           loading={running}
    />
  )
}