import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import React from "react";

dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

function Comment({
  comment: {
    text,
    user: { screen_name, avatar_hd },
    created_at,
  },
}) {
  return (
    <div className="py-3 border-b">
      <div className="flex items-center">
        <img
          className="w-6 h-6 rounded"
          alt="avatar"
          src={avatar_hd.replace("orj480", "crop.0.0.996.996.180")}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://tvax1.sinaimg.cn/default/images/default_avatar_male_180.gif";
          }}
        />
        <p className="text-sm ml-1">{screen_name}</p>
        <p className="ml-auto text-xs">{dayjs(created_at).fromNow()}</p>
      </div>

      <div className="mt-2" dangerouslySetInnerHTML={{ __html: text }}></div>
    </div>
  );
}

export default Comment;
