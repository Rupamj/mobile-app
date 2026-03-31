import ListHeading from "@/components/ListHeading";
import SubscriptionCard from "@/components/SubcriptionCard";
import UpcomingSubscriptionCard from "@/components/UpcomingSubcriptionCard";
import {
  HOME_BALANCE,
  HOME_SUBSCRIPTIONS,
  HOME_USER,
  UPCOMING_SUBSCRIPTIONS,
} from "@/constant/data";
import { icons } from "@/constant/icon";
import images from "@/constant/images";
import { formatCurrency } from "@/lib/utils";
import dayjs from "dayjs";
import { styled } from "nativewind";
import React, { useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView as RNSAreaview } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSAreaview);

const App = () => {
  const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<
    string | null
  >(null);

  // Define this separately to prevent remounting on every state change
  const renderHeader = (
    <>
      {/* Header */}
      <View className="home-header">
        <View className="home-user">
          <Image source={images.avatar} className="home-avatar" />
          <Text className="home-user-name">{HOME_USER.name}</Text>
        </View>
        <Image source={icons.add} className="home-add-icon" />
      </View>

      {/* Balance Card */}
      <View className="home-balance-card">
        <Text className="home-balance-label">Balance</Text>
        <View className="home-balance-row">
          <Text className="home-balance-amount">
            {formatCurrency(HOME_BALANCE.amount)}
          </Text>
          <Text className="home-balance-date">
            {dayjs(HOME_BALANCE.nextRenewalDate).format("MM/DD")}
          </Text>
        </View>
      </View>

      {/* Upcoming Subscriptions */}
      <View>
        <ListHeading title="Upcoming" />
        <FlatList
          data={UPCOMING_SUBSCRIPTIONS}
          renderItem={({ item }) => <UpcomingSubscriptionCard {...item} />}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={
            <Text className="home-empty-text">No upcoming subscriptions</Text>
          }
        />
      </View>

      {/* Put the "All Subscriptions" heading here so it scrolls too */}
      <ListHeading title="All Subscriptions" />
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-background p-5">
      <FlatList
        data={HOME_SUBSCRIPTIONS}
        ListHeaderComponent={renderHeader} // Pass the reference directly
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SubscriptionCard
            {...item}
            expanded={expandedSubscriptionId === item.id}
            onPress={() =>
              setExpandedSubscriptionId((currentId) =>
                currentId === item.id ? null : item.id,
              )
            }
          />
        )}
        extraData={expandedSubscriptionId}
        ItemSeparatorComponent={() => <View className="h-4" />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text className="home-empty-text">No active subscriptions</Text>
        }
        contentContainerClassName="pb-30"
      />
    </SafeAreaView>
  );
};
export default App;
