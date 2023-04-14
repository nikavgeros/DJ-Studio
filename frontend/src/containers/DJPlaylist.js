import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  WarningOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  CustomerServiceOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Table, Space, Button, Modal, Tooltip, Spin } from "antd";
import {
  deleteFromPlaylist,
  downloadMp3,
  downloadVideo,
} from "../utils/thunks";
import { setLoadingIcon } from "../store/reducers/videos";

const DJPlayList = () => {
  const userState = useSelector((state) => state.users);
  const playlistState = useSelector((state) => state.playlist);
  const [videoFrame, setVideoFrame] = useState({
    frame_open: false,
    frame_id: null,
    frame_title: null,
  });
  const videoLoadingIconsState = useSelector(
    (state) => state.videos.videoLoadingIcons
  );

  const dispatch = useDispatch();

  const deleteRecord = (value) => {
    value = JSON.parse(JSON.stringify({ video_id: value }));
    value["user_email"] = userState.user;
    console.log("deleteRecord:", value);
    dispatch(deleteFromPlaylist(value));
  };

  const toVideo = (value) => {
    console.log("downloadVideo:", value);
    dispatch(setLoadingIcon(`video-${value}`));
    dispatch(downloadVideo(value));
  };

  const toMp3 = (value) => {
    console.log("downloadMp3:", value);
    dispatch(setLoadingIcon(`mp3-${value}`));
    dispatch(downloadMp3(value));
  };

  const columns = [
    {
      title: <b>Youtube</b>,
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (_, record) => (
        <img
          src={record.thumbnail}
          width="100%"
          alt={record.video_id}
          style={{ cursor: "pointer" }}
          onClick={() => window.open(record.url, "_blank")}
        />
      ),
    },
    {
      title: <b>Title</b>,
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.length - b.title.length,
      width: "30%",
    },
    {
      title: <b>Video id</b>,
      dataIndex: "video_id",
      key: "video_id",
      width: "10%",
    },
    {
      title: <b>Url</b>,
      dataIndex: "url",
      key: "url",
      width: "30%",
      render: (_, record) => (
        <a href={record.url} target="_blank">
          {record.url}
        </a>
      ),
    },
    {
      title: <b>Action</b>,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="top" title={"Play"}>
            <Button
              shape="circle"
              icon={<PlayCircleOutlined style={{ fontSize: "16px" }} />}
              onClick={() => {
                console.log("PlayCircleOutlined", record.video_id);
                setVideoFrame({
                  frame_open: true,
                  frame_id: record.video_id,
                  frame_title: record.title,
                });
              }}
            />
            <Modal
              title={videoFrame.frame_title}
              centered
              open={videoFrame.frame_open}
              onOk={() =>
                setVideoFrame({
                  frame_open: false,
                  frame_id: null,
                  frame_title: null,
                })
              }
              onCancel={() =>
                setVideoFrame({
                  frame_open: false,
                  frame_id: null,
                  frame_title: null,
                })
              }
              width={1000}
              footer={[
                <Button
                  key="back"
                  onClick={() =>
                    setVideoFrame({
                      frame_open: false,
                      frame_id: null,
                      frame_title: null,
                    })
                  }
                >
                  Close
                </Button>,
              ]}
            >
              <iframe
                title={videoFrame.frame_title}
                width="950"
                height="500"
                src={`https://www.youtube.com/embed/${videoFrame.frame_id}`}
              ></iframe>
            </Modal>
          </Tooltip>
          <Tooltip placement="top" title={"Download Mp3"}>
            <Button
              id={"video-" + record.video_id}
              key={"video-" + record.video_id}
              value={record.video_id}
              onClick={() => toVideo(record.video_id)}
              icon={
                videoLoadingIconsState["video-" + record.video_id] ? (
                  <Spin size="small" />
                ) : (
                  <DownloadOutlined />
                )
              }
              shape="circle"
            />
          </Tooltip>
          <Tooltip placement="top" title={"Download Mp3"}>
            <Button
              id={"video-" + record.video_id}
              key={"video-" + record.video_id}
              value={record.video_id}
              onClick={() => toMp3(record.video_id)}
              icon={
                videoLoadingIconsState["mp3-" + record.video_id] ? (
                  <Spin size="small" />
                ) : (
                  <CustomerServiceOutlined />
                )
              }
              shape="circle"
            />
          </Tooltip>
          <Tooltip placement="top" title={"Remove from Playlist"}>
            <Button
              class="bi bi-trash"
              shape="circle"
              icon={<DeleteOutlined style={{ fontSize: "16px" }} />}
              onClick={() => {
                deleteRecord(record.video_id);
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      {userState.isAuthenticated ? (
        <>
          <Table
            class="styled-table"
            className="text-center container mt-5 "
            columns={columns}
            dataSource={playlistState.playlist_videos}
            pagination={{ position: ["bottomRight"] }}
          />
        </>
      ) : (
        <div class="text-center container mt-5">
          <WarningOutlined
            type="message"
            style={{ fontSize: "300px", color: "#08c" }}
          ></WarningOutlined>
          <h3>You should login to access this page</h3>
        </div>
      )}
    </>
  );
};

export default DJPlayList;
