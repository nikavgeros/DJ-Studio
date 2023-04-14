import React from "react";
import { Input, Space, Row, Col, Tooltip, Card, Button, Spin } from "antd";
import {
  YoutubeOutlined,
  CustomerServiceOutlined,
  StarOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchVideosFromYT,
  downloadMp3,
  downloadVideo,
  addToPlaylist,
} from "../utils/thunks";
import { setLoadingIcon, setEmptyVideos } from "../store/reducers/videos";
import { SetEmptyPlaylist } from "../store/reducers/playlist";

const { Meta } = Card;

const Home = () => {
  const userState = useSelector((state) => state.users);
  const videosState = useSelector((state) => state.videos);
  const videoLoadingIconsState = useSelector(
    (state) => state.videos.videoLoadingIcons
  );
  const dispatch = useDispatch();

  if (!userState.isAuthenticated) {
    dispatch(SetEmptyPlaylist());
  }

  const onSearchYT = (value) => {
    if (value.trim() !== "") {
      dispatch(setEmptyVideos());
      dispatch(fetchVideosFromYT(value));
    }
  };

  const toMp3 = (value) => {
    console.log("downloadMp3:", value);
    dispatch(setLoadingIcon(`mp3-${value}`));
    dispatch(downloadMp3(value));
  };

  const toVideo = (value) => {
    console.log("downloadVideo:", value);
    dispatch(setLoadingIcon(`video-${value}`));
    dispatch(downloadVideo(value));
  };

  const toPlaylist = (value) => {
    value = JSON.parse(JSON.stringify(value));
    value["user_email"] = userState.user;
    console.log("toPlaylist:", value);
    dispatch(addToPlaylist(value));
  };

  return (
    <>
      <div className="container text-center mt-5">
        <h1>Find your video</h1>
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center", padding: "20px" }}
        >
          <Input.Search
            placeholder="Search video"
            name="query"
            onSearch={onSearchYT}
            allowClear
            style={{
              width: 500,
            }}
          />
        </Space>
        {videosState.videos.length > 0 ? (
          <div className="site-card-wrapper">
            <Row gutter={8}>
              {videosState.videos.map((item) => (
                <Col span={8}>
                  <Card
                    cover={<img alt="example" src={`${item.thumbnail}`} />}
                    style={{ background: "white", marginTop: 50 }}
                    actions={[
                      <Tooltip placement="top" title={"Watch on YouTube"}>
                        <Button
                          id={"youtube-" + item.video_id}
                          key={"youtube-" + item.video_id}
                          onClick={() => window.open(item.url, "_blank")}
                          icon={<YoutubeOutlined />}
                          shape="round"
                        />
                      </Tooltip>,
                      <Tooltip placement="top" title={"Download Video"}>
                        <Button
                          id={"video-" + item.video_id}
                          key={"video-" + item.video_id}
                          value={item.id}
                          onClick={() => toVideo(item.video_id)}
                          icon={
                            videoLoadingIconsState["video-" + item.video_id] ? (
                              <Spin size="small" tip="Download" />
                            ) : (
                              <DownloadOutlined />
                            )
                          }
                          shape="round"
                        />
                      </Tooltip>,
                      <Tooltip placement="top" title={"Download MP3"}>
                        <Button
                          id={"mp3-" + item.video_id}
                          key={"mp3-" + item.video_id}
                          onClick={() => toMp3(item.video_id)}
                          icon={
                            videoLoadingIconsState["mp3-" + item.video_id] ? (
                              <Spin size="small" tip="Download" />
                            ) : (
                              <CustomerServiceOutlined />
                            )
                          }
                          shape="round"
                        />
                      </Tooltip>,
                      <Tooltip
                        placement="top"
                        title={
                          userState.isAuthenticated
                            ? "Add to Playlist"
                            : "Login required"
                        }
                      >
                        <Button
                          id={"playlist-" + item.video_id}
                          key={"playlist-" + item.video_id}
                          onClick={() => toPlaylist(item)}
                          icon={<StarOutlined />}
                          shape="round"
                          disabled={userState.isAuthenticated ? false : true}
                        />
                      </Tooltip>,
                    ]}
                  >
                    <Meta title={`${item.title}`} />
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ) : null}
        {videosState.loading ? (
          <div className="mt-5 text-center">
            <Spin tip="Fetching videos" size="large">
              <div className="content" />
            </Spin>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Home;
