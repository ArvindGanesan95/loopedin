import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  Box,
  IconButton,
  makeStyles
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import Scrollbar from "../../utils/Scrollbar";
import {
  getMyLoopsMessages,
  deleteLoopPost
} from "../../actions/user-connections";

const useStyle = makeStyles(theme => ({
  scrollbar: {
    widht: "100%",
    height: "40vh"
  }
}));

const MyPosts = props => {
  const {
    getMyLoopsMessages,
    myPostList,
    deleteLoopPost,
    loopSentTime
  } = props;

  const classes = useStyle();

  const [myPostMessageList, setMyPostMessageList] = useState(myPostList);
  const [loopDeleted, setLoopDeleted] = useState("");

  useEffect(() => {
    getMyLoopsMessages();
  }, [getMyLoopsMessages, loopSentTime, loopDeleted]);

  useEffect(() => {
    setMyPostMessageList(myPostList);
  }, [myPostList]);

  const onDeletePost = async (post, e) => {
    e.preventDefault();
    const postId = post._id;
    try {
      const response = await deleteLoopPost(postId);
      setLoopDeleted(Date.now());
    } catch (error) {
      console.log(error);
    }
  };

  const renderMyPost = (value, index) => {
    return (
      <div key={value._id}>
        <ListItem key={value}>
          <ListItemText primary={value.postContent} />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={e => onDeletePost(value, e)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="middle" component="li" />
      </div>
    );
  };
  return (
    <Fragment>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5" className="header-message">
            My posts
          </Typography>
        </ExpansionPanelSummary>

        <Box width="100%">
          <div className={classes.scrollbar}>
            <Scrollbar>
              <List>
                {" "}
                {myPostMessageList !== undefined ? (
                  myPostMessageList.map((value, index) => {
                    return renderMyPost(value, index);
                  })
                ) : (
                  <div></div>
                )}
              </List>
            </Scrollbar>
          </div>
        </Box>
      </ExpansionPanel>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    myPostList: state.userConnections.postsLists,
    loopSentTime: ownProps.loopSentTime
  };
};

export default connect(mapStateToProps, { getMyLoopsMessages, deleteLoopPost })(
  MyPosts
);