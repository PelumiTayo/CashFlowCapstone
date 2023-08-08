import React, { Fragment } from "react";
import {
  Flex,
  Box,
  Avatar,
  Heading,
  Text,
  useColorModeValue,
  Center,
  Link,
  useMediaQuery,
} from "@chakra-ui/react";
import ProfileModule from "./ProfileModule";
import ProfileGoals from "./ProfileGoals";
import Badges from "./Badges";

export default function ProfileView({ appState, setAppState }) {
  const [media, moreMedia] = useMediaQuery([
    "(max-width: 1000px)",
    "(max-width: 330px)",
  ]);

  return (
    <Fragment>
      <Box marginTop={"5%"} height={"100vh"} color={"white"}>
        <Box
          zIndex={"-1"}
          marginTop={"11%"}
          marginLeft={"16%"}
          mx={"auto"}
          rounded={"lg"}
          minHeight={"70vh"}
          maxHeight={"auto"}
          borderRadius={"40px"}
          fontSize={`${moreMedia ? "140%" : "220%"}`}
          width={`${moreMedia ? "95vw" : "70vw"}`}
          bg={useColorModeValue("var(--darkblue)", "var(--lightblue)")}
          boxShadow={"dark-lg"}
          p={8}
        >
          <Center>
            <Avatar
              width={"20vh"}
              height={"20vh"}
              src={
                appState.user.image_url !== ""
                  ? appState.user.image_url
                  : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
              }
            />
          </Center>
          <Flex flexDirection={`${media ? "column" : "row"}`} marginTop={"3%"}>
            <Flex
              width={media ? "100%" : "33%"}
              margin={"0 auto"}
              flex={"wrap"}
              display={"column"}
              textAlign={"center"}
            >
              <Heading
                fontSize={`${moreMedia ? "140%" : "2rem"}`}
                color={useColorModeValue("var(--grey)", "var(--midnight)")}
              >
                {appState.user.username}
              </Heading>
              <Text color={useColorModeValue("var(--grey)", "var(--midnight)")}>
                Username
              </Text>
            </Flex>
            <Flex
              width={media ? "100%" : "33%"}
              margin={"0 auto"}
              flex={"wrap"}
              display={"column"}
              textAlign={"center"}
            >
              <Heading
                fontSize={`${moreMedia ? "140%" : "2rem"}`}
                color={useColorModeValue("var(--grey)", "var(--midnight)")}
                marginLeft={"auto"}
                marginRight={"auto"}
              >
                {appState.user.total_points}
              </Heading>
              <Text color={useColorModeValue("var(--grey)", "var(--midnight)")}>
                Points
              </Text>
            </Flex>

            <Flex
              width={media ? "100%" : "33%"}
              margin={"0 auto"}
              flex={"wrap"}
              display={"column"}
              textAlign={"center"}
            >
              <Heading
                fontSize={`${moreMedia ? "140%" : "2rem"}`}
                color={useColorModeValue("var(--grey)", "var(--midnight)")}
              >
                {appState.user.status}
              </Heading>
              <Text color={useColorModeValue("var(--grey)", "var(--midnight)")}>
                Status
              </Text>
            </Flex>
          </Flex>
          <Badges appState={appState} />
          <Heading
            color={useColorModeValue("var(--grey)", "var(--midnight)")}
            textAlign={"center"}
            marginTop={"5%"}
            fontSize={`${moreMedia ? "140%" : "100%"}`}
          >
            Completed Modules
          </Heading>
          <Flex
            flexDirection={`${media ? "column" : "row"}`}
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={`${media ? "space-between" : "space-evenly"}`}
            marginTop={"20px"}
            direction={"row"}
            spacing={"2%"}
          >
            {appState.quizzes?.length > 0 ? (
              appState.quizzes.map((userQuiz) => (
                <ProfileModule key={userQuiz.id} userQuiz={userQuiz} />
              ))
            ) : (
              <Link href="/" style={{ textDecoration: "none" }}>
                <Text
                  textAlign={"center"}
                  color={useColorModeValue("var(--grey)", "var(--midnight)")}
                >
                  Start learning today!
                </Text>
              </Link>
            )}
          </Flex>
          <Heading
            color={useColorModeValue("var(--grey)", "var(--midnight)")}
            textAlign={"center"}
            marginTop={"5%"}
            fontSize={`${moreMedia ? "140%" : "100%"}`}
          >
            Completed Goals
          </Heading>
          <Flex
            flexWrap={"wrap"}
            alignItems={"center"}
            flexDirection={`${media ? "column" : "row"}`}
            justifyContent={`${media ? "space-between" : "space-evenly"}`}
            marginTop={"20px"}
            direction={"row"}
            spacing={"2%"}
          >
            {appState.goals.some(
              (userGoal) => userGoal.status === "Accomplished"
            ) ? (
              appState.goals.map((userGoal, ind) => {
                return (
                  userGoal.status === "Accomplished" && (
                    <ProfileGoals
                      moreMedia={moreMedia}
                      media={media}
                      ind={ind}
                      setAppState={setAppState}
                      appState={appState}
                      userGoal={userGoal}
                    />
                  )
                );
              })
            ) : (
              <Link href="/goals" style={{ textDecoration: "none" }}>
                <Text
                  textAlign={"center"}
                  color={useColorModeValue("var(--grey)", "var(--midnight)")}
                >
                  Start setting your CashFlow goals today!
                </Text>
              </Link>
            )}
          </Flex>
        </Box>
      </Box>
    </Fragment>
  );
}
