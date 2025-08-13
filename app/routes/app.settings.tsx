import {
  Box,
  Card,
  Layout,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useState } from "react";
import { Form, useLoaderData } from "@remix-run/react";
import type { Settings } from "app/types/settings";

export async function loader() {
  // get the data from db
  let settings = {
    name: "Product Size Chart updated",
    description: "A Shopify app to generate product size charts",
  };
  return settings;
}


export async function action({request}: { request: Request }) {
  // updates persistent data
  let formData = await request.formData();
  const settings = Object.fromEntries(formData) as Record<string, FormDataEntryValue>;
  return settings;
}

export default function SettingsPage() {
  const settings: Settings = useLoaderData();
  const [formState, setFormState] = useState(settings);

  return (
    <Page>
      <TitleBar title="Settings page" />
      <Layout>
        <Layout.Section>
          <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings and preferences here.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="post">
              <BlockStack gap="400">
                <TextField autoComplete="off" label="App name" name="name" value={formState.name} onChange={(value) => setFormState({...formState, name:value})} />
                <TextField autoComplete="off" label="Description" name="description" value={formState.description} onChange={(value) => setFormState({...formState, description:value})}/>
                <Button submit={true}> Save settings </Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
