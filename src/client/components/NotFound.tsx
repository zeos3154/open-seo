import { Link } from "@tanstack/react-router";
import { Button } from "@/client/components/ui/button";
import { useT } from "@/client/lib/i18n";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/client/components/ui/card";

export function NotFound() {
  const t = useT();
  return (
    <div className="flex min-h-full items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>404</CardTitle>
        </CardHeader>
        <CardContent className="text-muted-foreground">
          {t("The page you are looking for does not exist.")}
        </CardContent>
        <CardFooter>
          <Button nativeButton={false} render={<Link to="/" />}>
            {t("Home")}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
