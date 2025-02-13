import {
    Container,
    Heading,
    SkeletonText,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
  } from "@chakra-ui/react"
  import { useQuery, useQueryClient } from "@tanstack/react-query"
  import { useEffect, useState } from "react"
  import { z } from "zod"
  
  import { ItemsService } from "../../client"
  import ActionsMenu from "../../components/Common/ActionsMenu"
  import Navbar from "../../components/Common/Navbar"
  import AddItem from "../../components/Items/AddItem"
  import { PaginationFooter } from "../../components/Common/PaginationFooter.tsx"
  
  const itemsSearchSchema = z.object({
    page: z.number().catch(1),
  })
  
  const validSearch = {
    validateSearch: (search) => itemsSearchSchema.parse(search),
  }
  
  const PER_PAGE = 5
  
  function getItemsQueryOptions({ page }) {
    return {
      queryFn: () => ItemsService.readItems({ skip: (page - 1) * PER_PAGE, limit: PER_PAGE }),
      queryKey: ["items", { page }],
    }
  }
  
  function PatientsTable({ page, setPage }) {
    const queryClient = useQueryClient()
  
    const {
      data: items,
      isPending,
      isPlaceholderData,
    } = useQuery({
      ...getItemsQueryOptions({ page }),
      placeholderData: (prevData) => prevData,
    })
  
    const hasNextPage = !isPlaceholderData && items?.data.length === PER_PAGE
    const hasPreviousPage = page > 1
  
    useEffect(() => {
      if (hasNextPage) {
        queryClient.prefetchQuery(getItemsQueryOptions({ page: page + 1 }))
      }
    }, [page, queryClient, hasNextPage])
  
    return (
      <>
        <TableContainer>
          <Table size={{ base: "sm", md: "md" }}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            {isPending ? (
              <Tbody>
                <Tr>
                  {new Array(4).fill(null).map((_, index) => (
                    <Td key={index}>
                      <SkeletonText noOfLines={1} paddingBlock="16px" />
                    </Td>
                  ))}
                </Tr>
              </Tbody>
            ) : (
              <Tbody>
                {items?.data.map((item) => (
                  <Tr key={item.id} opacity={isPlaceholderData ? 0.5 : 1}>
                    <Td>{item.id}</Td>
                    <Td isTruncated maxWidth="150px">{item.title}</Td>
                    <Td color={!item.description ? "ui.dim" : "inherit"} isTruncated maxWidth="150px">
                      {item.description || "N/A"}
                    </Td>
                    <Td>
                      <ActionsMenu type={"Item"} value={item} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            )}
          </Table>
        </TableContainer>
        <PaginationFooter page={page} onChangePage={setPage} hasNextPage={hasNextPage} hasPreviousPage={hasPreviousPage} />
      </>
    )
  }
  
  function PatientsManagement() {
    const [page, setPage] = useState(1)
  
    return (
      <Container maxW="full">
        <Heading size="lg" textAlign={{ base: "center", md: "left" }} pt={12}>
          Items Management
        </Heading>
        <Navbar type={"Item"} addModalAs={AddItem} />
        <PatientsTable page={page} setPage={setPage} />
      </Container>
    )
  }
  
  export default PatientsManagement;
  